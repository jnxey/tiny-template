#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const projectName = process.argv[2] || 'my-project';
const targetDir = path.resolve(process.cwd(), projectName);

console.log(`Creating project in ${targetDir}...`);
fs.mkdirSync(targetDir, { recursive: true });

// 拷贝模板文件
const templateDir = path.resolve(__dirname, '../template');
fs.cpSync(templateDir, targetDir, { recursive: true });

// 修改 package.json 中的 name 字段
const packageJsonPath = path.join(targetDir, 'package.json');
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8')); // 读取 package.json

// 修改项目名
packageJson.name = projectName;  // 设置新的项目名

// 将修改后的 package.json 写回文件
fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2), 'utf-8');

console.log(`Project name set to "${projectName}" in package.json`);

// 安装依赖
execSync('npm install', { cwd: targetDir, stdio: 'inherit' });

console.log('Project setup complete!');
