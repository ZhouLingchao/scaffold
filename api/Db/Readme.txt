1.修改实体类Entity字段或者实体类相关约束后需要运行迁移命令
	1.Add-Migration removeMappingId -Project Db -StartupProject Api
	2.update-database
	3.script-migration <from> <to> (此命令可选，用于生成对应的sql脚本)