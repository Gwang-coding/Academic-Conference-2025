#!/usr/bin/env node
/**
 * 🍑 하이브리드 검색 시스템 설치 확인
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🍑 하이브리드 검색 시스템 체크');
console.log('=================================\n');

let allGood = true;

// 1. Node.js 체크
try {
    const nodeVersion = process.version;
    console.log(`✅ Node.js: ${nodeVersion}`);
} catch (e) {
    console.log('❌ Node.js 확인 실패');
    allGood = false;
}

// 2. npm 패키지 체크
const requiredPackages = ['express', 'axios', 'concurrently'];
requiredPackages.forEach((pkg) => {
    try {
        require.resolve(pkg);
        console.log(`✅ npm 패키지: ${pkg}`);
    } catch (e) {
        console.log(`❌ npm 패키지 없음: ${pkg} (npm install 실행 필요)`);
        allGood = false;
    }
});

// 3. Python 체크
try {
    let pythonVersion;
    try {
        pythonVersion = execSync('python3 --version', { encoding: 'utf8' });
    } catch {
        pythonVersion = execSync('python --version', { encoding: 'utf8' });
    }
    console.log(`✅ Python: ${pythonVersion.trim()}`);
} catch (e) {
    console.log('❌ Python 설치 필요');
    allGood = false;
}

// 4. 필수 파일 체크
const requiredFiles = ['semantic_search.py', 'requirements-python.txt', 'index.js', 'public/index.html'];

requiredFiles.forEach((file) => {
    const filePath = path.join(__dirname, file);
    if (fs.existsSync(filePath)) {
        console.log(`✅ 파일: ${file}`);
    } else {
        console.log(`❌ 파일 없음: ${file}`);
        allGood = false;
    }
});

// 5. 🍑 표시 체크
const indexHtml = fs.readFileSync(path.join(__dirname, 'public/index.html'), 'utf8');
const peachCount = (indexHtml.match(/🍑/g) || []).length;
console.log(`✅ 하이브리드 검색 코드: ${peachCount}개 🍑 표시 발견`);

// 결과
console.log('\n=================================');
if (allGood) {
    console.log('✅ 모든 준비 완료!');
    console.log('\n실행 방법:');
    console.log('  npm run start:all  (모든 서버)');
    console.log('  npm start         (Express만)');
    console.log('  npm run ai        (AI 서버만)');
} else {
    console.log('⚠️ 일부 설정이 필요합니다.');
    console.log('\n해결 방법:');
    console.log('  1. npm install');
    console.log('  2. Python 설치 (https://python.org)');
    console.log('  3. pip install -r requirements-python.txt');
}
console.log('=================================');
