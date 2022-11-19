module.exports = function(sequelize, DataTypes) {
  return sequelize.define('property_group', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(75),
      allowNull: false
    },
    sheet_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'sheet',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'property_group',
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
        name: "property_group_sheet_idx",
        using: "BTREE",
        fields: [
          { name: "sheet_id" },
        ]
      },
    ]
  });
};
