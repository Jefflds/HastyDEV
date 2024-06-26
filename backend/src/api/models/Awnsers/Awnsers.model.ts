import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../../loaders/sequelize/sequelize";
import User from "../User/User.model";
import Comment from "../Commets/Commets.model";
import { AnswerAttributes } from "../../../types/Awnsers/Awnsers.type";

class Answer extends Model<AnswerAttributes> implements AnswerAttributes {
  public commentid!: number;
  public postid!: number;
  public replyid!: number;
  public userid!: number;
  public content!: string;
  public createdAt!: Date;
  public updatedAt!: Date;
}

Answer.init(
  {
    replyid: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userid: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    commentid: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      onUpdate: 'CASCADE',
    },
  },
  {
    sequelize: sequelize,
    modelName: "Answer",
    tableName: "replies",
    timestamps: true,
  }
);

Answer.belongsTo(User, { foreignKey: 'userid', as: 'author' });
Answer.belongsTo(Comment, { foreignKey: 'commentid', as: 'comment' });

export default Answer;
