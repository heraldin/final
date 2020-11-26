const app = new Vue({

    el:"#main",

    data:{

        id_cliente:null,
        razon_social:'',
        nombre:'',
        apellido:'',
        telefono:'',
        correo_electronico:'',

        id_host:null,
        hostname:'',
        dir_ip:'',
        fecha_carga:'',
        cliente:'',

        cpu:null,
        estado_io:null,

        mem:null,
        estado_mem:null,

        OS:null,
        
        lista_host:[],
        lista_clientes:[],

        c_selec_cli:'',

    },

    methods:{

        obtener_id(id_cliente){

            c_selec_cli = id_cliente;
        
        },

        capturarCpu(){
			const socket = io('http://localhost:5000');

			socket.on('cpu_porcentual', (data) => {

				this.cpu = data;

				if (this.cpu > 60.00)
				{
					this.estado_io = 'excedido';
				}else{
					this.estado_io = 'normal';
				}

			});
        },
        
        capturarMem(){
			const socket = io('http://localhost:5000');

			socket.on('mem_info', (data) => {

                this.mem = data.freeMemPercentage;
                
                if (this.mem > 70.00)
				{
					this.estado_mem = 'excedido';
				}else{
					this.estado_mem = 'normal';
				}
			});
		},

		capturarOs(){
			const socket = io('http://localhost:5000');

			socket.on('distro', (data) => {

				this.OS = data;
			});
		},


        listar_host(){

            axios.get('http://localhost:5000/equipos').then(resultado => {

                this.lista_host = resultado.data;

            });

        },

        listar_clientes(){

            axios.get('http://localhost:5000/clientes').then(resultado => {

                this.lista_clientes = resultado.data;

            });

        },

        eliminarHost(codigo_host){

            axios.delete('http://localhost:5000/equipos/'+codigo_host).then( resultado => {
                    alert(resultado.data);
                    this.listar_host();
            });

        },

        eliminarCliente(codigo_cliente){

            axios.delete('http://localhost:5000/clientes/'+codigo_cliente).then( resultado => {
                    alert(resultado.data);
                    this.listar_clientes();
            });

        },

        guardarCliente()
        {
            //contruimos el body
            let unCli = {
                razon_social: this.razon_social,
                nombre: this.nombre,
                apellido: this.apellido,
                correo_electronico: this.correo_electronico,
                telefono: this.telefono,             
            }
            axios.post('http://localhost:5000/clientes',unCli).then( resultado => {
                alert(resultado.data);
                this.listar_clientes();
                this.razon_social = '';
                this.nombre = '';
                this.apellido = '';
                this.correo_electronico = '';
                this.telefono = '';
                });
        },

        guardarEquipo()
        {
            //contruimos el body
            let unEqp = {
                hostname: this.hostname,
                dir_ip: this.dir_ip,
                fecha_carga: this.fecha_carga,
                cliente: this.c_selec_cli,                         
            }
            axios.post('http://localhost:5000/equipos',unEqp).then( resultado => {
                alert(resultado.data);
                this.listar_host();
                this.hostname = '';
                this.dir_ip = '';
                this.fecha_carga = '';
                this.c_selec_cli= null;
                });
        },

        //este metodo va a llevar los datos al formulario
        editarCliente(id_cliente,razon_social,nombre,apellido,correo_electronico,telefono)
        {
            this.id_cliente = id_cliente;
            this.razon_social = razon_social;
            this.nombre = nombre;
            this.apellido = apellido;
            this.correo_electronico = correo_electronico;	
            this.telefono = telefono;
        },

        editarEquipo(id_host,hostname,dir_ip,fecha_carga,cliente)
        {
            this.id_host= id_host;
            this.hostname = hostname;
            this.dir_ip = dir_ip;
            this.fecha_carga = fecha_carga;
            this.c_selec_cli = cliente;
        },

        actualizarCliente()
        {
            let unClint = {
                razon_social: this.razon_social,
                nombre: this.nombre,
                apellido: this.apellido,
                correo_electronico: this.correo_electronico,
                telefono: this.telefono,
            }
            axios.put('http://localhost:5000/clientes/'+this.id_cliente,unClint).then( resultado => {
                alert(resultado.data);
                this.listar_clientes()

                this.razon_social = '';
                this.nombre = '';
                this.apellido = '';
                this.correo_electronico = '';
                this.telefono = '';
                                
            });
        },

        actualizarEquipo()
        {
            let unEq = {
                hostname: this.hostname,
                dir_ip: this.dir_ip,
                fecha_carga: this.fecha_carga,
                cliente: this.cliente,        
            }
            axios.put('http://localhost:5000/equipos/'+this.id_host,unEq).then( resultado => {
                alert(resultado.data);
                this.listar_host()

                this.hostname = '';
                this.dir_ip = '';
                this.fecha_carga = '';
                this.cliente = null;                                
            });
        }
    },

    created:function()
    {
        this.listar_host();
        this.listar_clientes();

        this.capturarCpu();
        this.capturarOs();
        this.capturarMem();
    }

});