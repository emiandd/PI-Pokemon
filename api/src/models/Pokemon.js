const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('pokemon', {

  	id: {
  		type: DataTypes.UUID,
  		defaultValue: DataTypes.UUIDV4,
  		allowNull: false,
  		primaryKey: true
  	},

    name: {
      type: DataTypes.STRING,
      allowNull: false,
      set(value){
        this.setDataValue('name', value.toLowerCase())
      }
    },

    life: {
    	type: DataTypes.INTEGER
    },

    attack: {
    	type: DataTypes.INTEGER
    },

    defense: {
    	type: DataTypes.INTEGER
    },

    speed: {
    	type: DataTypes.INTEGER
    },

    height: {
    	type: DataTypes.INTEGER
    },

    weight: {
    	type: DataTypes.INTEGER
    },

    image: {
      type: DataTypes.TEXT
    }

  },
  {
    timestamps: false
  });
};

    // [ ] Pokemon con las siguientes propiedades:
    //     ID (Número de Pokemon) * : No puede ser un ID de un pokemon ya existente en la API pokeapi
    //     Nombre *
    //     Vida
    //     Ataque
    //     Defensa
    //     Velocidad
    //     Altura
    //     Peso

