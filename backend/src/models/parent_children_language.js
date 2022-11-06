module.exports = function(sequelize, DataTypes) {
  return sequelize.define('parent_children_language', {
    parent_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'parent',
        key: 'id'
      }
    },
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
    }
  }, {
    sequelize,
    tableName: 'parent_children_language',
    timestamps: false,
    indexes: [
      {
        name: "parent_id_idx",
        using: "BTREE",
        fields: [
          { name: "parent_id" },
        ]
      },
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
