var app = new Vue({
    el: '#app',
    data: { 
        items: null,
        keyword:'',
        message:'',       
    },
    watch:{

        keyword: function(newKeword, oldKeyword) {
            this.message = 'Waiting for you to stop typing...'
            this.debouncedGetAnser()
        }
    },
    created: function(){

        // this.keyword = 'javaScript'
        // this.getAnswer()
        this.debouncedGetAnser = _.debounce(this.getAnswer, 1000)

    },
    methods: {
        getAnswer: function() {
            if(this.keyword === '') {
                this.items = null
                this.message = ''
                return
            }
            this.message = 'loading...'
            var vm = this
            var params = {page: 1, par_page:20, query:this.keyword}
            axios.get('https://qiita.com/api/v2/items',{params})
                .then(function(response){
                    console.log(response.data)
                    vm.items = response.data
                })
                .catch(function(error){
                    vm.message = 'Error!' + error
                })
                .finally(function(){
                    vm.message = ''
                })
        }
    }
  
})