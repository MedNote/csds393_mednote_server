const graphql = require('graphql');
const _=require('lodash');
const MedNote = require('../models/MedNote');
var moment = require('moment');

const {GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLInt, GraphQLList, GraphQLInputObjectType} = graphql;
const { GraphQLDate, GraphQLTime, GraphQLDateTime} = require('graphql-iso-date');



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
    date:{type:GraphQLDateTime}
  })
});

const immInputType = new GraphQLInputObjectType({
  name: 'immunizationIn',
  fields: ()=>({
    immunization:{type:GraphQLString},
    date:{type:GraphQLDateTime}
  })
});

const noteType = new GraphQLObjectType({
  name: 'note',
  fields: ()=>({
    note:{type:GraphQLString},
    date:{type:GraphQLDateTime}
  })
});

const RecordType = new GraphQLObjectType({
  name: 'MedNote',
  fields:()=>({
    uuid:{type:GraphQLString},
    name:{type:nameType},
    dob:{type:GraphQLString},
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
    },
    visit_notes:{
      type:new GraphQLList(noteType)
      //resolve: ()=> getItems(),
    }
  })
});

const RootQuery = new GraphQLObjectType({
  name:'RootQueryType',
  fields:{
    record_by_id:{
      type:RecordType,
      args:{UUID:{type:GraphQLID}},
      resolve(parent,args){	
        found = MedNote.findById(args.UUID);
        return found;
      }
    },
    record_by_uuid:{
      type:RecordType,
      args:{UUID:{type:GraphQLString}},
      resolve(parent,args){	
        let found = MedNote.findOne({
          uuid: args.UUID
        });
        return found;
      }
    },
    record_after_date:{
      type:RecordType,
      args:{UUID:{type:GraphQLID}, date:{type: GraphQLDateTime}},
      resolve(parent,args){	
        // console.log(args);
        return MedNote.findOne({
          uuid: args.UUID,
          "immunizations.date": {
              // $gte: new Date(new Date(2012, 7, 14).setHours(00, 00, 00))
              $gte: new Date(args.date)
              // $gte: moment(new Date(new Date(2012, 7, 14).setHours(00, 00, 00))).format('YYYY-MM-DD[T]HH:mm:ss.SSS[Z]').toDate()
          }
        });
      //   , function (err, docs) {
      //     if (err){
      //         console.log(err);
      //     }
      //     else{
      //         console.log("First function call : ", docs);
      //     }
      // }
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
        uuid: {type: GraphQLString},
        name: {type: nameInputType},
        dob: {type: GraphQLString},
        allergies: {type: new GraphQLList(GraphQLString)},
        medications: {type: new GraphQLList(GraphQLString)},
        immunizations: {type: new GraphQLList(immInputType)}
      },
      resolve(parent,args){
        let mednote = new MedNote({
          uuid: args.uuid,
          name: args.name,
          dob: args.dob,
          allergies: args.allergies,
          medications: args.medications,
          immunizations: args.immunizations
        });
        return mednote.save();
      }
    },

    updateRecord:{
      type: RecordType,
      args:{
        uuid: {type: GraphQLString},
        name: {type: nameInputType},
        dob: {type: GraphQLString},
        allergies: {type: new GraphQLList(GraphQLString)},
        medications: {type: new GraphQLList(GraphQLString)},
        immunizations: {type: new GraphQLList(immInputType)}
      },
      resolve(parent,args){
        if(args.name == {})
          args.name = MedNote.findById(args.uuid).name;
        if(args.dob == {})
          args.dob = MedNote.findById(args.uuid).dob;
        if(args.allergies == {})
          args.allergies = MedNote.findById(args.uuid).allergies;
        if(args.medications == {})
          args.medications = MedNote.findById(args.uuid).medications;
        if(args.immunizations == {})
          args.immunizations = MedNote.findById(args.uuid).immunizations;
        return MedNote.findOneAndUpdate(
          {"uuid": args.uuid},
          { "$set":{name: args.name, dob: args.dob, allergies: args.allergies, medications: args.medications, immunizations: args.immunizations}},
          {"new": true});
      }
    },

    appendRecord:{
      type: RecordType,
      args:{
        uuid: {type: GraphQLString},
        name: {type: nameInputType},
        dob: {type: GraphQLString},
        allergies: {type: new GraphQLList(GraphQLString)},
        medications: {type: new GraphQLList(GraphQLString)},
        immunizations: {type: new GraphQLList(immInputType)}
      },
      resolve(parent,args){
        // let args.name = {MedNote.findById(args.uuid).name, args.name};
        args.allergies.push(MedNote.findById(args.uuid).allergies);
        args.medications.push(MedNote.findById(args.uuid).medications);
        args.immunizations.push(MedNote.findById(args.uuid).immunizations);
        return MedNote.findOneAndUpdate(
          {"uuid": args.uuid},
          { "$set":{name: args.name, dob: args.dob, allergies: args.allergies, medications: args.medications, immunizations: args.immunizations}},
          {"new": true});
      }
    }
  }
    
})



module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});
