//sql.js
// SQL语句封裝
var user = {
    insert:'INSERT INTO user(username, password) VALUES(?,?)',
    update:'UPDATE user SET name=?, sex=?, age=?, IDCard=?, type=? WHERE id=?',
    delete: 'DELETE FROM user WHERE id=?',
    queryById: 'SELECT * FROM user WHERE id=?',
    queryAll: 'SELECT * FROM user',
    queryByArgs: (id, name, username, IDCard, type) => {
        let sql = !id && !name && !username && !IDCard && !type
               ? 'SELECT * FROM user'
               : `SELECT * FROM user where ${ id ? 'id=?' : '' }${ name ? ' and name=?' : ''  }${ username ? ' and username=? ' : ''  }
               ${ IDCard ? ' and IDCard=? ' : ''  }${ type ? ' and type=?' : ''  }`;
               console.log('sql', sql)
        return sql;
    },
    login: 'SELECT id, name, sex, age, IDCard, username, type FROM user WHERE username=? and password=?',
};
module.exports = {
    user,
};
