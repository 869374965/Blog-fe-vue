var mysql = require('mysql');
var pool = mysql.createPool({
    host: "47.98.120.163",
    user: "root",
    password: "admin",
    database: "blog",
    port: 3306
});
let query = (sql, values) => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) {
                reject(err)
            } else {
                connection.query(sql, values, (err, rows) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve(rows)
                    }
                    connection.release()
                })
            }
        })
    })
}
// 注册用户
exports.insertData = value => {
  let _sql = "insert into users set name=?,pass=?,avator=?,moment=?;";
  return query(_sql, value);
};
// 删除用户
exports.deleteUserData = name => {
    let _sql = `delete from users where name="${name}";`
    return query(_sql)
}
// 查找用户
exports.findDataByName = name => {
  let _sql = `select * from users where name="${name}";`;
  return query(_sql);
};
exports.insetArt = value => {
    let _sql = `insert into t_contents set title=?,slug=?,created=?,modified=?,content=?,author_id=?,type=?,status=?,tags=?,categories=?,hits=?,comments_num=?,allow_comment=?,allow_ping=?,allow_feed=?`;
    return query(_sql,value)
}

//获取文章总数
exports.getArtCount = () => {
  let _sql = `select count(*) from t_contents;`;
  return query(_sql);
};

//分页获取博客文章数据
/**
 * 
 * @param {*页码} pageNum 
 * @param {*页数} pageSize 
 */
exports.getArtListByPage = (pageNum, pageSize) => {
    let _sql = `select * from t_contents  order by cid DESC  limit ${pageNum},${pageSize};`;
  return query(_sql);
};
//根据id搜索文章
exports.getDetail = id => {
    let _sql = `select *from t_contents where cid=${id};`
    return query(_sql);
}