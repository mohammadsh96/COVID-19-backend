"use strict";
class Collection {
  constructor(model) {
    this.model = model;
  }

  create(data) {
    let record = this.model.create(data);
    return record;
  }
  get() {
    try {
      return this.model.findAll();
    } catch {
      console.error("Error in getting all data");
    }
  }

  async delete(userId, realId, id) {
    let record = await this.model.findOne({ where: { id: id } });
    if (record.userId == userId) {

      if (userId == realId) {
        let data = await this.model.destroy({ where: { id: id } });

        return data;
      }
    } else {
      return "you are not the Owner of this product";
    }
  }
  getById(id) {
    if (id) {
      return this.model.findOne({
        where: {
          id,
        },
      });
    } else {
      console.error("post does not exist");
    }
  }
  async update(realId, postId, obj) {
    let updated = null;
    if (!postId) {
      throw new Error("No id provided for model ", this.model);
    }
    let record = await this.model.findOne({ where: { id: postId } });
    if (record) {
      if (realId === record.userId) {
        try {
          updated = await this.model.update(obj, {
            where: { id: postId },
            returning: true,
          });
          return updated;
        } catch (e) {
          console.error("Error in updating record in model ", this.model);
        }
      } else {
        console.error("You can not update posts of other users !!  ");
      }
    } else {
      console.error(`There is no model with this id: ${id}`);
    }
  }

  async getMyProducts(realId, userId, postId) {
    if (realId == userId) {
      if (postId) {
        let data = await this.model.findOne({
          where: {
            userId: realId,
            id: postId,
          },
        });
        if (data) {
          return data;
        } else {
          let err = "sorry, we cannot find this post";
          return err;
        }
      }
      if (!postId) {
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
