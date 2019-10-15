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
        propertyOwer, type, isSun, isNew, contactInformation, isLease, isSale) VALUES(?,?,?,?,?,?,?,?,?,?,?,?)`,
    // 修改房源
    update() {
        let sql = '';
        sql = `
        UPDATE house SET 
            name=?, addr=?, style=?, area=?, propertyRight=?, 
            propertyOwer=?, type=?, isSun=?, isNew=?, contactInformation=?, isLease=?, isSale=? WHERE id=?;
            `
        return sql
    },
    // 设置是否出租
    setIsLease:`UPDATE house SET isLease=? where id=?`,
    // 删除房源
    delete: 'DELETE FROM house WHERE id=?',
    // 查找房源
    queryAll: 'SELECT * FROM house',
    //id 房屋名称 户型 是否朝阳 房屋类型 是否新房 是否出租 是否出售 产权 产权人 联系方式
    queryByArgs: (id, name, style, propertyRight, 
        propertyOwer, type, isSun, isNew, contactInformation, isLease, isSale) => {
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
               ${ contactInformation ? 'contactInformation=? and ' : ''  }
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
// 出租管理
var lease = {
    // 添加出租房源
    insert:`INSERT INTO lease(houseId) VALUES(?)`,
    // 修改出租房源
    update:`UPDATE lease SET money=?, startTime=?, endTime=?, remark=? WHERE id=?`,
    // 申领出租房源
    receive:`UPDATE lease SET agentId=?`,
    // 删除出租房源
    delete: 'DELETE FROM lease WHERE houseId=?',
    // 查找出租房源
    selectByHouseId: 'SELECT * FROM lease where houseId=?',
    //查找条件：id 房屋名称 户型 是否朝阳 房屋类型 是否新房  产权
    queryByArgs: (id, name, style, isSun, type, isNew, propertyRight) => {
        // SELECT * FROM 
        // ( lease LEFT JOIN house ON lease.houseId = house.id )
        // 	LEFT JOIN user ON lease.agentId = user.id
        let sql = `SELECT
                lease.id as id,
                house.id as houseId,
                house.name as name,
                house.type,
                house.propertyRight,
                house.style,
                house.isNew,
                house.isSun,
                house.type,
                lease.money,
                lease.startTime,
                lease.endTime,
                lease.remark,
                user.contactInformation,
                user.name as saleName
                FROM ( lease LEFT JOIN house ON lease.houseId = house.id )
                LEFT JOIN user ON lease.agentId = user.id
               ${ [].every.call(arguments, (item) => { return !!item }) ? 'where ' : '' }
               ${ id ? 'lease.id=?  and ' : ''  }
               ${ name ? 'house.name=?  and ' : ''  }
               ${ style ? 'house.style=?  and ' : ''  }
               ${ propertyRight ? 'house.propertyRight=? and ' : ''  }
               ${ type ? 'house.type=? and ' : ''  }
               ${ isSun ? 'house.isSun=? and ' : ''  }
               ${ isNew ? 'house.isNew=? and ' : ''  }
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
