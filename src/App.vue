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
               //1// this.$http.post('https://vuejs-http-4e9e1.firebaseio.com/AmanData.json', this.user).then(response=>{ console.log(response) }, error=>{ console.log(error) });
               //2// this.resource.save({}, this.user); // save:{method:'POST'} see documentation of vue-resource in gitHub
                this.resource.saveAlt(this.user);
            },
            fetchData(){
              /*  this.$http.get('AmanData.json').then(response=>{ return response.json(); })
                    .then(receivedData=>{   /*let resultArr=[];
                                            for(let x in receivedData){
                                                resultArr.push(receivedData[x]);
                                            }
                                            this.fetchedUser=resultArr;
                                           this.fetchedUser=receivedData; } ); */
                    this.resource.getData({node: this.node}).then(response=>{ return response.json(); })
                        .then(receivedData=>{this.fetchedUser=receivedData;} );
            }
        },
        created(){
            const customAction={  //this is created to POST new data in a different node "alretnative.json" so that the data of first node "AmanData" not get overwritten by the new data. so the new data will go to the new node.
                saveAlt:{method:'POST', url:'alternative.json'},
                getData:{method:'GET'}
            };
            //this.resource=this.$resource('{node}.json'); // without creating the "alternative.json" so all data will go to the first node "AmanData.json"
            this.resource=this.$resource('{node}.json', {}, customAction);
        }
    }
</script>

<style>
</style>
