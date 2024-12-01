const { Parser } = require('node-sql-parser');
const parser = new Parser();
const ast = parser.astify(`
CREATE TABLE \`auth\` (
  \`id\` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键',
  \`name\` varchar(50) NOT NULL COMMENT '权限名称',
  \`uni_key\` varchar(50) NOT NULL COMMENT '权限表示',
  \`status\` enum('1','2') NOT NULL COMMENT '状态(正常：1，禁用：2)',
  \`created_time\` datetime NOT NULL COMMENT '创建时间',
  PRIMARY KEY (\`id\`),
  UNIQUE KEY \`auth_unique\` (\`uni_key\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='权限信息表';
`);
ast[0].create_definitions.forEach((item) => {
  console.log(JSON.stringify(item));
});
