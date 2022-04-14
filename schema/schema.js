const graphql = require('graphql');
const _=require('lodash');
const MedNote = require('../models/MedNote');

const {GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLInt, GraphQLList, GraphQLInputObjectType} = graphql;


const nameType = new GraphQLObjectType({
  name: 'name',
  fields: ()=>({
    first_name:{type:GraphQLString},
    last_name:{type:GraphQLString}
  })
});

const nameInputType = new GraphQLInputObjectType({
  name: 'nameIn',
  fields: ()=>({
    first_name:{type:GraphQLString},
    last_name:{type:GraphQLString}
  })
});

const immType = new GraphQLObjectType({
  name: 'immunization',
  fields: ()=>({
    immunization:{type:GraphQLString},
    date:{type:GraphQLString}
  })
});

const immInputType = new GraphQLInputObjectType({
  name: 'immunizationIn',
  fields: ()=>({
    immunization:{type:GraphQLString},
    date:{type:GraphQLString}
  })
});

const RecordType = new GraphQLObjectType({
  name: 'MedNote',
  fields:()=>({
    UUID:{type:GraphQLID},
    name:{type:nameType},
    DOB:{type:GraphQLString},
    allergies:{
      type:new GraphQLList(GraphQLString)
      //resolve: ()=> getItems(),
    },
    medications:{
      type:new GraphQLList(GraphQLString)
      //resolve: ()=> getItems(),
    },
    immunizations:{
      type:new GraphQLList(immType)
      //resolve: ()=> getItems(),
    }
  })
});

const RootQuery = new GraphQLObjectType({
  name:'RootQueryType',
  fields:{
    record:{
      type:RecordType,
      args:{UUID:{type:GraphQLID}},
      resolve(parent,args){	
        return MedNote.findById(args.UUID);
      }
    }
  }
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields:{
    addRecord:{
      type: RecordType,
      args:{
        name: {type: nameInputType},
        DOB: {type: GraphQLString},
        allergies: {type: new GraphQLList(GraphQLString)},
        medications: {type: new GraphQLList(GraphQLString)},
        immunizations: {type: new GraphQLList(immInputType)}
      },
      resolve(parent,args){
        let mednote = new MedNote({
          name: args.name,
          DOB: args.DOB,
          allergies: args.allergies,
          medications: args.medications,
          immunizations: args.immunizations
        });
        return mednote.save();
      }
    }
  }
})


module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});
