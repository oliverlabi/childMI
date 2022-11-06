module.exports = function(sequelize, DataTypes) {
  return sequelize.define('teacher', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name_code: {
      type: DataTypes.STRING(75),
      allowNull: true
    },
    first_name: {
      type: DataTypes.STRING(75),
      allowNull: false
    },
    last_name: {
      type: DataTypes.STRING(75),
      allowNull: false
    },
    start_year: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'teacher',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
