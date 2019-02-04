<template>
    <div class="container">
        <div class="row">
            <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
                <h1>Http</h1>
                <div class="form-group">
                    <label>Username</label>
                    <input class="form-control" v-model="user.userName">
                </div>
                <div class="form-group">
                    <label>Mail</label>
                    <input class="form-control" v-model="user.userEmail">
                </div>
                <button class="btn btn-primary" v-on:click="submit">Submit</button>
                <hr>
                <input class="form-control" type="text" v-model="node">
                <br><br>
                <button class="btn btn-primary" v-on:click="fetchData">Get Data</button><br><br>
                <ul class="list-group">
                    <li class="list-group-item" v-for="x in fetchedUser">{{x.userName}}--{{x.userEmail}}</li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                user:{userName:'', userEmail:''},
                fetchedUser:[], //array to collect all the received user objects
                resource:{},
                node:'AmanData',
            };
        },
        methods:{
            submit(){
               //1//
                // this.$http.post('https://vuejs-http-4e9e1.firebaseio.com/AmanData.json', this.user).then(response=>{ console.log(response) }, error=>{ console.log(error) });


              //2////submitting data using Vue Resource// save:{method:'POST'} see documentation of vue-resource in gitHub
               //  this.resource.save({}, this.user);

              //3//
                this.resource.saveAlt(this.user);

              //4//to create and to send data to "alternative2" node
                //this.resource.saveAlt2(this.user);
            },
            fetchData(){
                //1//////Without using Vue resource
              /* this.$http.get('AmanData.json').then(response=>{ return response.json(); })
                    .then(receivedData=>{   let resultArr=[];
                                            for(let x in receivedData){
                                                resultArr.push(receivedData[x]);
                                            }
                                           // this.fetchedUser=resultArr;
                                           this.fetchedUser=receivedData; } ); */


                //2////// Get data using  Vue Resource
                //this.resource.get('').then(response=>{ return response.json(); }).then(receivedData=>{ this.fetchedUser=receivedData;} );


                //3//
                this.resource.get({node:this.node}).then(response=>{ return response.json(); }).then(receivedData=>{ this.fetchedUser=receivedData;} );
            }
        },
        created(){
            const customAction={  //this is created to POST new data in a different node "alretnative.json" . so the new data will go to the new node.
                saveAlt:{method:'POST', url:'alternative.json'},

                saveAlt2:{method:'POST', url:'alternative2.json'},

                saveAlt3:{method:'POST', url:'alternative3.json'},

                getData:{method:'GET'}
            };
           //1// this.resource=this.$resource('AmanData.json'); //A new node "AmanData.json" will be created and all data will under that

           // this.resource=this.$resource('{node}.json'); //On each submission a new unique node will be created and each data will go under a separate unique node.

            this.resource=this.$resource('{node}.json', {}, customAction);
        }
    }
</script>

<style>
</style>
