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
            };
        },
        methods:{
            submit(){
                this.$http.post('https://vuejs-http-4e9e1.firebaseio.com/AmanData.json', this.user).then(response=>{ console.log(response) }, error=>{ console.log(error) });
            },
            fetchData(){
                this.$http.get('').then(response=>{ return response.json(); })
                    .then(receivedData=>{  let resultArr=[];
                                            for(let x in receivedData){
                                                resultArr.push(receivedData[x]);
                                            }
                                           this.fetchedUser=resultArr; } );
            }
        }
    }
</script>

<style>
</style>
