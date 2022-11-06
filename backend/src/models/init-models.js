const DataTypes = require("sequelize").DataTypes;
const _child = require("./child");
const _child_language = require("./child_language");
const _child_language_group = require("./child_language_group");
const _child_properties = require("./child_properties");
const _comment = require("./comment");
const _grading_paper = require("./grading_paper");
const _language = require("./language");
const _language_group = require("./language_group");
const _parent = require("./parent");
const _parent_children_language = require("./parent_children_language");
const _properties = require("./properties");
const _property_group = require("./property_group");
const _school = require("./school");
const _teacher = require("./teacher");
const _teacher_children = require("./teacher_children");
const _teacher_school = require("./teacher_school");

function initModels(sequelize) {
  const child = _child(sequelize, DataTypes);
  const child_language = _child_language(sequelize, DataTypes);
  const child_language_group = _child_language_group(sequelize, DataTypes);
  const child_properties = _child_properties(sequelize, DataTypes);
  const comment = _comment(sequelize, DataTypes);
  const grading_paper = _grading_paper(sequelize, DataTypes);
  const language = _language(sequelize, DataTypes);
  const language_group = _language_group(sequelize, DataTypes);
  const parent = _parent(sequelize, DataTypes);
  const parent_children_language = _parent_children_language(sequelize, DataTypes);
  const properties = _properties(sequelize, DataTypes);
  const property_group = _property_group(sequelize, DataTypes);
  const school = _school(sequelize, DataTypes);
  const teacher = _teacher(sequelize, DataTypes);
  const teacher_children = _teacher_children(sequelize, DataTypes);
  const teacher_school = _teacher_school(sequelize, DataTypes);

  child_language.belongsTo(child, { as: "child", foreignKey: "child_id"});
  child.hasMany(child_language, { as: "child_languages", foreignKey: "child_id"});
  child_language_group.belongsTo(child, { as: "child", foreignKey: "child_id"});
  child.hasMany(child_language_group, { as: "child_language_groups", foreignKey: "child_id"});
  child_properties.belongsTo(child, { as: "child", foreignKey: "child_id"});
  child.hasMany(child_properties, { as: "child_properties", foreignKey: "child_id"});
  comment.belongsTo(child, { as: "child", foreignKey: "child_id"});
  child.hasMany(comment, { as: "comments", foreignKey: "child_id"});
  grading_paper.belongsTo(child, { as: "child", foreignKey: "child_id"});
  child.hasMany(grading_paper, { as: "grading_papers", foreignKey: "child_id"});
  parent_children_language.belongsTo(child, { as: "child", foreignKey: "child_id"});
  child.hasMany(parent_children_language, { as: "parent_children_languages", foreignKey: "child_id"});
  teacher_children.belongsTo(child, { as: "child", foreignKey: "child_id"});
  child.hasMany(teacher_children, { as: "teacher_children", foreignKey: "child_id"});
  child_language.belongsTo(language, { as: "language", foreignKey: "language_id"});
  language.hasMany(child_language, { as: "child_languages", foreignKey: "language_id"});
  parent_children_language.belongsTo(language, { as: "language", foreignKey: "language_id"});
  language.hasMany(parent_children_language, { as: "parent_children_languages", foreignKey: "language_id"});
  child_language_group.belongsTo(language_group, { as: "language_group", foreignKey: "language_group_id"});
  language_group.hasMany(child_language_group, { as: "child_language_groups", foreignKey: "language_group_id"});
  parent_children_language.belongsTo(parent, { as: "parent", foreignKey: "parent_id"});
  parent.hasMany(parent_children_language, { as: "parent_children_languages", foreignKey: "parent_id"});
  child_properties.belongsTo(properties, { as: "property", foreignKey: "property_id"});
  properties.hasMany(child_properties, { as: "child_properties", foreignKey: "property_id"});
  properties.belongsTo(property_group, { as: "group_property_group", foreignKey: "group"});
  property_group.hasMany(properties, { as: "properties", foreignKey: "group"});
  teacher_school.belongsTo(school, { as: "school", foreignKey: "school_id"});
  school.hasMany(teacher_school, { as: "teacher_schools", foreignKey: "school_id"});
  teacher_children.belongsTo(teacher, { as: "teacher", foreignKey: "teacher_id"});
  teacher.hasMany(teacher_children, { as: "teacher_children", foreignKey: "teacher_id"});
  teacher_school.belongsTo(teacher, { as: "teacher", foreignKey: "teacher_id"});
  teacher.hasMany(teacher_school, { as: "teacher_schools", foreignKey: "teacher_id"});

  return {
    child,
    child_language,
    child_language_group,
    child_properties,
    comment,
    grading_paper,
    language,
    language_group,
    parent,
    parent_children_language,
    properties,
    property_group,
    school,
    teacher,
    teacher_children,
    teacher_school,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
