//sql.js
// SQL语句封裝
// 用户
var user = {
    insert:'INSERT INTO user(username, password) VALUES(?,?)',
    update:'UPDATE user SET name=?, sex=?, age=?, IDCard=?, type=? WHERE id=?',
    resetPassword:'UPDATE user SET password=? WHERE id=?',
    delete: 'DELETE FROM user WHERE id=?',
    queryById: 'SELECT * FROM user WHERE id=?',
    queryAll: 'SELECT * FROM user',
    queryByArgs: (id, name, username, IDCard, type) => {
        let sql = `SELECT * FROM user 
               ${ [].some.call(arguments, (item) => { return !!item }) ? 'where ' : '' }
               ${ id ? 'id=? and ' : '' }
               ${ name ? 'name=? and ' : ''  }
               ${ username ? 'username=? and ' : ''  }
               ${ IDCard ? 'IDCard=? and ' : ''  }
               ${ type ? 'type=? and ' : ''  }
               1=1`;
        return sql;
    },
    login: 'SELECT id, name, sex, age, IDCard, username, type FROM user WHERE username=? and password=?',
};

// 房子
var house = {
    // 发布房源
    insert:`INSERT INTO house(name, addr, style, area, propertyRight, 
        propertyOwer, type, isSun, isNew, ContactInformation, isLease, isSale) VALUES(?,?,?,?,?,?,?,?,?,?,?,?)`,
    update:`UPDATE house SET 
            name=?, addr=?, style=?, area=?, propertyRight=?, 
            propertyOwer=?, type=?, isSun=?, isNew=?, ContactInformation=?, isLease=?, isSale=? WHERE id=?`,
    delete: 'DELETE FROM house WHERE id=?',
    queryById: 'SELECT * FROM house WHERE id=?',
    queryAll: 'SELECT * FROM house',
    //id 房屋名称 户型 是否朝阳 房屋类型 是否新房 是否出租 是否出售 产权 产权人 联系方式
    queryByArgs: (id, name, style, propertyRight, 
        propertyOwer, type, isSun, isNew, ContactInformation, isLease, isSale) => {
        let sql = `SELECT * FROM house 
               ${ [].every.call(arguments, (item) => { return !!item }) ? 'where ' : '' }
               ${ id ? 'id=? and ' : '' }
               ${ name ? 'name=?  and ' : ''  }
               ${ style ? 'style=?  and ' : ''  }
               ${ propertyRight ? 'propertyRight=? and ' : ''  }
               ${ propertyOwer ? 'propertyOwer=? and ' : ''  }
               ${ type ? 'type=? and ' : ''  }
               ${ isSun ? 'isSun=? and ' : ''  }
               ${ isNew ? 'isNew=? and ' : ''  }
               ${ ContactInformation ? 'ContactInformation=? and ' : ''  }
               ${ isLease ? 'isLease=? and ' : ''  }
               ${ isSale ? 'isSale=? and ' : ''  }
               1=1`;
               console.log('-----------------------------------------')
               console.log('sql', sql)
               console.log('arguments', id)
        return sql;
    }
};

// SELECT * FROM 
// ( lease LEFT JOIN house ON lease.houseId = house.id )
// 	LEFT JOIN user ON lease.agentId = user.id
// 房子
var lease = {
    // 发布房源
    insert:`INSERT INTO lease(houseId) VALUES(?)`,
    update:`UPDATE lease SET money=?, startTime=?, endTime=?, desc=? WHERE id=?`,
    receive:`UPDATE lease SET agentId=?`,
    delete: 'DELETE FROM lease WHERE id=?',
    queryById: 'SELECT * FROM house WHERE id=?',
    queryAll: 'SELECT * FROM house, lease',
    //id 房屋名称 户型 是否朝阳 房屋类型 是否新房 是否出租 是否出售 产权 产权人 联系方式
    queryByArgs: (id, name, style, propertyRight, 
        propertyOwer, type, isSun, isNew, ContactInformation, isLease, isSale) => {
        let sql = `SELECT * FROM lease, house, user
               ${ [].every.call(arguments, (item) => { return !!item }) ? 'where ' : '' }
               lease.houseId = house.id
               ${ id ? 'id=? and ' : '' }
               ${ name ? 'name=?  and ' : ''  }
               ${ style ? 'style=?  and ' : ''  }
               ${ propertyRight ? 'propertyRight=? and ' : ''  }
               ${ propertyOwer ? 'propertyOwer=? and ' : ''  }
               ${ type ? 'type=? and ' : ''  }
               ${ isSun ? 'isSun=? and ' : ''  }
               ${ isNew ? 'isNew=? and ' : ''  }
               ${ ContactInformation ? 'ContactInformation=? and ' : ''  }
               ${ isLease ? 'isLease=? and ' : ''  }
               ${ isSale ? 'isSale=? and ' : ''  }
               1=1`;
               console.log('-----------------------------------------')
               console.log('sql', sql)
               console.log('arguments', id)
        return sql;
    }
};

module.exports = {
    user, house, lease
};
