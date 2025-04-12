#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// 默认排除的目录和文件
const DEFAULT_EXCLUDE = [
  'node_modules',
  'dist',
  '.git',
  'pnpm-lock.yaml',
  'yarn.lock',
  'package-lock.json',
  'coverage',
  '.DS_Store',
  '.vscode',
  '.idea'
];

/**
 * 解析命令行参数
 */
function parseArgs() {
  const args = process.argv.slice(2);
  
  if (args.length < 2) {
    console.error('用法: node create-project.js <源项目> <新项目名> [--exclude=额外排除的文件,用逗号分隔]');
    process.exit(1);
  }
  
  const sourceProject = args[0];
  const newProjectName = args[1];
  
  let excludeArg = args.find(arg => arg.startsWith('--exclude='));
  let additionalExcludes = [];
  
  if (excludeArg) {
    additionalExcludes = excludeArg.replace('--exclude=', '').split(',');
  }
  
  return {
    sourceProject,
    newProjectName,
    excludes: [...DEFAULT_EXCLUDE, ...additionalExcludes]
  };
}

/**
 * 验证源项目目录是否存在
 */
function validateSourceProject(sourceProject) {
  const sourcePath = path.resolve(sourceProject);
  
  if (!fs.existsSync(sourcePath)) {
    console.error(`错误: 源项目目录 "${sourceProject}" 不存在`);
    process.exit(1);
  }
  
  return sourcePath;
}

/**
 * 验证新项目名并创建目录
 */
function prepareNewProject(newProjectName) {
  const newProjectPath = path.resolve(newProjectName);
  
  if (fs.existsSync(newProjectPath)) {
    console.error(`错误: 目标目录 "${newProjectName}" 已存在`);
    process.exit(1);
  }
  
  // 创建新项目目录
  fs.mkdirSync(newProjectPath, { recursive: true });
  
  return newProjectPath;
}

/**
 * 复制文件和目录，排除指定项
 */
function copyFiles(sourcePath, targetPath, excludes) {
  console.log(`正在从 ${sourcePath} 复制文件到 ${targetPath}`);
  
  // 读取源目录的所有文件和文件夹
  const items = fs.readdirSync(sourcePath);
  
  for (const item of items) {
    // 检查是否在排除列表中
    if (excludes.includes(item)) {
      console.log(`排除: ${item}`);
      continue;
    }
    
    const sourceItemPath = path.join(sourcePath, item);
    const targetItemPath = path.join(targetPath, item);
    
    const stats = fs.statSync(sourceItemPath);
    
    if (stats.isDirectory()) {
      // 如果是目录，递归复制
      fs.mkdirSync(targetItemPath, { recursive: true });
      copyFiles(sourceItemPath, targetItemPath, excludes);
    } else {
      // 如果是文件，直接复制
      fs.copyFileSync(sourceItemPath, targetItemPath);
      console.log(`复制: ${item}`);
    }
  }
}

/**
 * 更新package.json中的项目名称
 */
function updatePackageJson(newProjectPath, newProjectName) {
  const packageJsonPath = path.join(newProjectPath, 'package.json');
  
  if (fs.existsSync(packageJsonPath)) {
    try {
      const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
      
      // 更新项目名称
      packageJson.name = path.basename(newProjectName);
      
      // 写回文件
      fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
      console.log('已更新 package.json 中的项目名称');
    } catch (error) {
      console.warn('警告: 无法更新 package.json:', error.message);
    }
  }
}

/**
 * 主函数
 */
function main() {
  console.log('👋 欢迎使用 NestJS 项目创建脚本');
  
  // 解析参数
  const { sourceProject, newProjectName, excludes } = parseArgs();
  
  // 验证源项目
  const sourcePath = validateSourceProject(sourceProject);
  
  // 准备新项目目录
  const newProjectPath = prepareNewProject(newProjectName);
  
  // 复制文件
  copyFiles(sourcePath, newProjectPath, excludes);
  
  // 更新package.json
  updatePackageJson(newProjectPath, newProjectName);
  
  console.log('\n✅ 项目创建完成!');
  console.log(`\n新项目位于: ${newProjectPath}`);
  console.log('\n建议接下来执行:');
  console.log(`  cd ${newProjectName}`);
  console.log('  pnpm install');
  console.log('  pnpm run start:dev');
}

// 执行主函数
main(); 