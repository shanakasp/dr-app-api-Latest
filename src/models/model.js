import { DataTypes } from "sequelize";
import sequelize from "../../config/db.connection.js";

// Admin Table
export const Admin = sequelize.define(
  "Admin",
  {
    // Model attributes
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "Admin",
  }
);
// Category Table
export const Category = sequelize.define(
  "Category",
  {
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    category_name: {
      type: DataTypes.CHAR(50),
      allowNull: false,
    },
    image_url: {
      type: DataTypes.TEXT,
    },
  },
  { tableName: "Categories", timestamps: true }
);
// Common Question Table
export const CommonQuestion = sequelize.define(
  "Common_Questions",
  {
    // Model attributes
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "common_questions",
    timestamps: false,
  }
);
// Disease Table
export const Disease = sequelize.define(
  "Disease",
  {
    disease_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    disease_name: {
      type: DataTypes.CHAR(100),
      allowNull: false,
    },
  },
  { tableName: "Diseases", timestamps: true }
);
// Question Table
export const Questions = sequelize.define(
  "Questions",
  {
    // Model attributes
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "questions",
    timestamps: false,
    // foreign key constrain
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  }
);
// Value Table
export const Value = sequelize.define(
  "values",
  {
    value: {
      type: DataTypes.STRING,
    },
  },
  {
    tableName: "values",
    timestamps: false,
  }
);
// User Table
export const User = sequelize.define(
  "User",
  {
    // Model attributes
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    firstName: {
      type: DataTypes.STRING,
    },
    lastName: {
      type: DataTypes.STRING,
    },
  },
  {
    tableName: "Users",
  }
);

// Associations
Questions.hasMany(Value, {
  foreignKey: "question_id",
});
Value.belongsTo(Questions, {
  foreignKey: "question_id",
});

Category.hasMany(Disease, {
  foreignKey: "category_id",
});
Disease.belongsTo(Category, {
  foreignKey: "category_id",
  onDelete: "CASCADE",
});

Category.hasMany(Questions, {
  foreignKey: "category_id",
});
Questions.belongsTo(Category, {
  foreignKey: "category_id",
});
