module.exports = function(sequelize, DataTypes) {
  return sequelize.define('teacher_children', {
    child_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'child',
        key: 'id'
      }
    },
    teacher_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'teacher',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'teacher_children',
    timestamps: false,
    indexes: [
      {
        name: "children_id_idx",
        using: "BTREE",
        fields: [
          { name: "child_id" },
        ]
      },
      {
        name: "teacher_id_idx",
        using: "BTREE",
        fields: [
          { name: "teacher_id" },
        ]
      },
    ]
  });
};
