module.exports = function(sequelize, DataTypes) {
  return sequelize.define('grading_paper', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    child_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'child',
        key: 'id'
      }
    },
    year: {
      type: DataTypes.DATE,
      allowNull: false
    },
    season: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    url: {
      type: DataTypes.STRING(300),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'grading_paper',
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
      {
        name: "grading_paper_child_id_idx",
        using: "BTREE",
        fields: [
          { name: "child_id" },
        ]
      },
    ]
  });
};
