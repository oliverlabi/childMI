module.exports = function(sequelize, DataTypes) {
  return sequelize.define('child_language_group', {
    child_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'child',
        key: 'id'
      }
    },
    language_group_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'language_group',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'child_language_group',
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
        name: "language_group_child_id_idx",
        using: "BTREE",
        fields: [
          { name: "language_group_id" },
        ]
      },
    ]
  });
};
