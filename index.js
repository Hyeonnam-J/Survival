import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

// 정적 파일을 제공할 디렉토리 설정
app.use(express.static(path.join(__dirname)));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(3000);