"use strict";
import { Model, DataTypes } from "sequelize";

export default (sequelize) => {
  class Consultation extends Model {}

  Consultation.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      patientId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Patients",
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        validate: {
          isDate: true,
        },
      },
      patientComplaint: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      aggravatingFactors: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      relievingFactors: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      associatedSymptoms: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      painType: {
        type: DataTypes.ENUM(
          "Neuropathique",
          "Nociceptive mécanique (périphérique)",
          "Nociceptive inflammatoire (périphérique)",
          "Centralisée"
        ),
        allowNull: true,
      },
      eva: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      diagnosis: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      clinicalExamination: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      osteopathyTesting: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      treatment: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      advice: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "Consultation",
      tableName: "Consultations",
      timestamps: true,
    }
  );

  Consultation.associate = (models) => {
    Consultation.belongsTo(models.Patient, {
      foreignKey: "patientId",
      as: "patient",
      onDelete: "CASCADE",
    });
  };

  return Consultation;
};
