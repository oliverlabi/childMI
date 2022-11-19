module.exports = function(sequelize, DataTypes) {
  return sequelize.define('child_properties', {
    child_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'child',
        key: 'id'
      }
    },
    property_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'properties',
        key: 'id'
      }
    },
    value: {
      type: DataTypes.STRING(200),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'child_properties',
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
        name: "property_id_idx",
        using: "BTREE",
        fields: [
          { name: "property_id" },
        ]
      },
    ]
  });
};
