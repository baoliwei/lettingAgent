//sql.js
// SQL语句封裝
// 用户
var user = {
    insert:'INSERT INTO user(username, password) VALUES(?,?)',
    update:'UPDATE user SET name=?, sex=?, age=?, IDCard=?, type=? WHERE id=?',
    delete: 'DELETE FROM user WHERE id=?',
    queryById: 'SELECT * FROM user WHERE id=?',
    queryAll: 'SELECT * FROM user',
    queryByArgs: (id, name, username, IDCard, type) => {
        let sql = !id && !name && !username && !IDCard && !type
               ? 'SELECT * FROM user'
               : `SELECT * FROM user where 
               ${ id ? 'id=?' : '' }
               ${ name ? ' and name=?' : ''  }
               ${ username ? ' and username=? ' : ''  }
               ${ IDCard ? ' and IDCard=? ' : ''  }
               ${ type ? ' and type=?' : ''  }`;
               console.log('sql', sql)
        return sql;
    },
    login: 'SELECT id, name, sex, age, IDCard, username, type FROM user WHERE username=? and password=?',
};

// 房子
var house = {
    // 发布房源
    insert:`INSERT INTO house(name, addr, style, area, propertyRight, 
        propertyOwer, type, isSun, isNew, ContactInformation, isLease, isSale) VALUES(?,?,?,?,?,?,?,?,?,?,?,?)`,
    update:'UPDATE user SET name=?, sex=?, age=?, IDCard=?, type=? WHERE id=?',
    delete: 'DELETE FROM user WHERE id=?',
    queryById: 'SELECT * FROM user WHERE id=?',
    queryAll: 'SELECT * FROM user',
    //id 房屋名称 户型 是否朝阳 房屋类型 是否新房 是否出租 是否出售 产权 产权人 联系方式
    queryByArgs: (id, name, style, propertyRight, 
        propertyOwer, type, isSun, isNew, ContactInformation, isLease, isSale) => {
        let sql = `SELECT * FROM house 
               ${ [].every.call(arguments, (item) => { return !!item }) ? 'where ' : '' }
               ${ id ? 'id=?' : '' }
               ${ name ? ' and name=?' : ''  }
               ${ style ? ' and style=? ' : ''  }
               ${ propertyRight ? ' and propertyRight=? ' : ''  }
               ${ propertyOwer ? ' and propertyOwer=?' : ''  }
               ${ type ? ' and type=?' : ''  }
               ${ isSun ? ' and isSun=?' : ''  }
               ${ isNew ? ' and isNew=?' : ''  }
               ${ ContactInformation ? ' and ContactInformation=?' : ''  }
               ${ isLease ? ' and isLease=?' : ''  }
               ${ isSale ? ' and isSale=?' : ''  }`;
               console.log('-----------------------------------------')
               console.log('sql', sql)
        return sql;
    },
    login: 'SELECT id, name, sex, age, IDCard, username, type FROM user WHERE username=? and password=?',
};

module.exports = {
    user, house
};
