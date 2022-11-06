module.exports = function(sequelize, DataTypes) {
  return sequelize.define('child_language', {
    child_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'child',
        key: 'id'
      }
    },
    language_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'language',
        key: 'id'
      }
    },
    primary: {
      type: DataTypes.TINYINT,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'child_language',
    timestamps: false,
    indexes: [
      {
        name: "child_id_idx",
        using: "BTREE",
        fields: [
          { name: "child_id" },
        ]
      },
      {
        name: "language_id_idx",
        using: "BTREE",
        fields: [
          { name: "language_id" },
        ]
      },
    ]
  });
};
