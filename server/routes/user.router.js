import express from 'express';
import bcrypt from 'bcrypt';
import configs from '../util/config.js';
import jwt from 'jsonwebtoken';
import { findUserByID, getPasswordById, registerUser } from '../db/user/user.db.js';

const accountRouter = express.Router();

const signUp = async (req, res, next) => {
  const { user_id, password } = req.body;

  if (!user_id) {
    return res.status(400).json({ errorMessage: '유저 아이디를 입력해 주세요' });
  }
  if (!password) {
    return res.status(400).json({ errorMessage: '비밀번호를 입력해 주세요' });
  }

  const validatePassword = (password) => {
    if (password == null || password == undefined) {
      return res.status(400).json({ errorMessage: '사용할 수 없는 문구가 포함되어 있습니다' });
    }
    const regex = /^(?=\S+$).{8,}$/;
    return regex.test(password);
  };
  if (!validatePassword(password)) {
    return res.status(400).json({ errorMessage: '비밀번호 유효성 검사 실패' });
  }
  try {
    const exists = await findUserByID(user_id);
    if (exists) {
      return res.status(409).json({ errorMessage: '이미 존재하는 사용자입니다.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await registerUser(user_id, hashedPassword);

    return res.status(201).json({ message: '회원가입 완료' });
  } catch (error) {
    console.error('회원가입 오류:', error);
    return res.status(500).json({ errorMessage: '서버 오류가 발생했습니다.' });
  }
};

const login = async (req, res) => {
  try {
    const jwtSecret = configs.jwtSecret;
    const { user_id, password } = req.body;

    const exists = await findUserByID(user_id);
    if (!exists) {
      return res.status(409).json({ errorMessage: '존재하지 않는 사용자 입니다.' });
    }

    const hashedPassword = await getPasswordById(user_id);
    if (!hashedPassword) {
      return res.status(404).json({ errorMessage: '서버 DB 오류 : 저장된 비밀번호를 찾을 수 없습니다' });
    }
    const passwordMatch = await bcrypt.compare(password, hashedPassword);
    if (!passwordMatch) {
      return res.status(401).json({ errorMessage: '비밀번호가 일치하지 않습니다.' });
    }

    const token = jwt.sign({ user_id }, jwtSecret, {
      expiresIn: '24h',
    });
    res.status(200).json({ message: '로그인 성공 인증토큰 발행 완료', token: token });
  } catch (error) {
    console.error('로그인 오류', error);
    res.status(500).json({ errorMessage: error.message });
  }
};

accountRouter.post('/signUp', signUp);
accountRouter.post('/login', login);

export default accountRouter;
