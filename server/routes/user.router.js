import express from 'express';
import bcrypt from 'bcrypt';
import configs from '../util/config.js';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';

const accountRouter = express.Router();

const signUp = async (req, res, next) => {
  try {
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
    const isExistUser = async (user_id) => {
      //SQL 내부에 중복되는 유저 아이디가 있는지 검증
    };
    if (isExistUser) {
      return res.status(409).json({ errorMessage: '이미 존재하는 아이디 입니다.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    //비밀번호 해시처리

    //SQL에 유저 데이터 저장하는 로직

    return res.status(200).json({ message: '회원가입 완료' });
  } catch (error) {
    //커스텀 에러 구현시 마저 작성해야 함
  }
};

const login = async (req, res) => {
  try {
    const jwtSecret = configs.jwtSecret;
    const { user_id, password } = req.body;

    //SQL에서 유저 ID를 기반으로 사용자 조회
    //SQL에서 해시된 유저 비밀번호를 가져옴
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

accountRouter.post('/signUp', signUp);
accountRouter.post('/login', login);

export default accountRouter;