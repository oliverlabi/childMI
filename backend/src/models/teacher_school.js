module.exports = function(sequelize, DataTypes) {
  return sequelize.define('teacher_school', {
    teacher_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'teacher',
        key: 'id'
      }
    },
    school_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'school',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'teacher_school',
    timestamps: false,
    indexes: [
      {
        name: "teacher_id_idx",
        using: "BTREE",
        fields: [
          { name: "teacher_id" },
        ]
      },
      {
        name: "school_id_idx",
        using: "BTREE",
        fields: [
          { name: "school_id" },
        ]
      },
    ]
  });
};
