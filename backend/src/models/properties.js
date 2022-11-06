module.exports = function(sequelize, DataTypes) {
  return sequelize.define('properties', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(150),
      allowNull: false
    },
    group: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'property_group',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'properties',
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
        name: "group_idx",
        using: "BTREE",
        fields: [
          { name: "group" },
        ]
      },
    ]
  });
};
