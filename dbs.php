<?php
header("Access-Control-Allow-Origin:*"); 
header("Content-Type:text/html;charset=utf-8");
date_default_timezone_set('Asia/Shanghai');
session_start();

//WD($_REQUEST,$_SERVER);

if(!file_exists('db.db')){
  touch('db.db');
  $pds = new PDO('sqlite:db.db',null,null,array(PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION));
  $SQL = 'CREATE TABLE user(
           id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, -- 用户ID,主键
           username TEXT NOT NULL,                        -- 用户名,必填
           password TEXT(64) NOT NULL,                    -- 用户密码,必填
           fullname TEXT                                  -- 用户全称,必填
         )';
  $pds->exec($SQL);
  $SQL = 'CREATE TABLE warehouse(
           id INTEGER PRIMARY KEY AUTOINCREMENT,          -- 入库ID,主键
           title TEXT NOT NULL,                           -- 标题,必填(标签上的标题)
           brand TEXT NOT NULL,                           -- 牌名,必填
           furnaces TEXT NOT NULL,                        -- 炉号,必填
           summation INTEGER NOT NULL DEFAULT 0           -- 合计,必填 默认值 0
           date TEXT NOT NULL,                            -- 日期,必填
           timestamp INTEGER NOT NULL,                    -- 时间戳,必填
           creator TEXT NOT NULL,                         -- 制表人,必填
           remark TEXT                                    -- 备注
         )';
  $pds->exec($SQL);
  $SQL = 'CREATE TABLE records(
           id INTEGER PRIMARY KEY AUTOINCREMENT,          -- 每捆ID,主键
           warehouseID INTEGER NOT NULL,                  -- 入库ID,必填
           bundle INTEGER NOT NULL,                       -- 捆号,必填
           suttle INTEGER NOT NULL,                       -- 净重,必填
           date TEXT NOT NULL,                            -- 日期,必填
           timestamp INTEGER NOT NULL,                    -- 时间戳,必填
           creator TEXT NOT NULL,                         -- 制表人,必填
           remark TEXT                                    -- 备注
         )';
  $pds->exec($SQL);
  $SQL = 'CREATE TABLE syslog(
           id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, -- 用户ID,主键
           errorcode  INTEGER,                            -- 错误代码
           records    TEXT,                               -- 用户密码
           userId     TEXT,                               -- 用户序号
           fullname   TEXT,                               -- 用户全称
           ip         TEXT                                -- 来访地址
         )';
  $pds->exec($SQL);
  #插入基础用户以及密码 YanKoo/86651113 boss/88888888 db/666666
  $SQL = "INSERT INTO user VALUES (1,'YanKoo','c2472393e46bb551b741a0f2625963885a40963f6d5d9add6bf6d6450cfd0002','系统设计')";
  $pds->exec($SQL);
  $SQL = "INSERT INTO user VALUES (2,'boss','615ed7fb1504b0c724a296d7a69e6c7b2f9ea2c57c1d8206c5afdf392ebdfd25','老板')";
  $pds->exec($SQL);
  $SQL = "INSERT INTO user VALUES (3,'db','94edf28c6d6da38fd35d7ad53e485307f89fbeaf120485c8d17a43f323deee71','员工')";
  $pds->exec($SQL);
}else{
  try {
    $pds = new PDO('sqlite:db.db',null,null,array(PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION));
  }catch(Exception $e) {
    $pds = NULL;
    exit($e->getMessage());
  }
}

$SQL = 'SELECT * FROM warehouse ORDER BY id DESC';
$result = $pds->query($SQL,PDO::FETCH_ASSOC)->fetchall();

try {
  $Table ='<table class="ui celled inverted grey table">'.PHP_EOL;
  $Table.='<thead class="center aligned"><tr><th>序号</th><th>域名序号</th><th>类别</th><th>IP地址</th><th>说明</th></tr></thead>'.PHP_EOL.'<tbody>'.PHP_EOL;
  foreach($result as $k => $v){
    $Table.='<tr>'.PHP_EOL;
    foreach($v as $key => $value){
      $Table.='<td class="center aligned">'.$k.'</td>'.PHP_EOL;
      $Table.='<td class="center aligned">'.$v[$key].'</td>'.PHP_EOL;
      $Table.='<td class="center aligned">'.$v[$key].'</td>'.PHP_EOL;
      $Table.='<td class="center aligned">'.$v[$key].'</td>'.PHP_EOL;
      $Table.='<td class="center aligned">'.$v[$key].'</td>'.PHP_EOL;
    }
    $Table.='</tr>'.PHP_EOL;
  }
  $Table.='</tbody>'.PHP_EOL.'</table>';
} catch(PDOException $e) {
  var_dump('错误',$e,$result);
}


?>
<!DOCTYPE html>
<html class="img-no-display">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
<title>欢迎光临 <?php echo $content; ?></title>
<script src="../jquery.min.js"></script>
<script src="../semantic.min.js"></script>
<link  href="../semantic.min.css" rel="stylesheet">
</head>
<body>
<?php echo $Table; ?>
</body>
</html>