const initServer = async () => {
    try {
      // await loadProtos();
      // 초기화시 작동될 코드들
    } catch (e) {
      console.error(e);
      process.exit(1); // 오류 발생 시 프로세스 종료
    }
  };
  
  export default initServer;
  