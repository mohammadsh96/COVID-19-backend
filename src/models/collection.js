"use strict";
class Collection {
  constructor(model) {
    this.model = model;
  }

  create(data) {
    let record = this.model.create(data);
    return record;
  }
  

  async delete(userId, realId, id) {
    let record = await this.model.findOne({ where: { id: id } });
    if (record.userId == userId) {

      if (userId == realId) {
        let data = await this.model.destroy({ where: { id: id } });

        return data;
      }
    } else {
      return "you are not the Owner of this Record";
    }
  }


  async getMyRecords(realId, userId, RecordId) {
    if (realId == userId) {
      if (RecordId) {
        let data = await this.model.findOne({
          where: {
            userId: realId,
            id: RecordId,
          },
        });
        if (data) {
          return data;
        } else {
          let err = "sorry, we cannot find this Record";
          return err;
        }
      }
      if (!RecordId) {
        return this.model.findAll({
          where: {
            userId: realId,
            
          },
        });
      }
         }
    console.log("id not matching  ");
    let data = "you cannot access other users dashboard";
    return data;
  }
}
module.exports = Collection;
