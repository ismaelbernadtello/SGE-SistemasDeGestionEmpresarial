from odoo import api, models, fields



# La clase plantilla es una tabla mas de la base de datos y sus atributos son los campos de la tabla
class plantilla(models.Model): 
    
    #sirve para hacer que una clase herede los atributos de la otra, en este caso la clase plantilla hereda los atributos de la clase base
    _inherit = 'salesianos.base' 
    #si queremos que una clase herede de una clase en un modulo diferente se pone el nombre de la clase de forma normal 
    # y en el archivo manifest en el apartado depends se pone el nombre del modulo del que depende el modulo actual
    _inherit = 'clase_de_otro_modulo'
    
    # obligatorio y es recomendable que sea el nombre de la clase
    _name = 'plantilla' 
    
    # es opcional
    _description = 'Clase para las plantillas' 
    
    # el campo id es autoincrementativo y es de tipo integer, el string es el nombre que se le da al campo en la interfaz
    id = fields.Integer(required=True, string='ID') 
    
    # el campo name es obligatorio y es de tipo char, el string es el nombre que se le da al campo en la interfaz
    name = fields.Char(required=True, string='Nombre') 
    
    # el campo color es obligatorio y es de tipo selection, el string es el nombre que se le da al campo en la interfaz
    color = fields.Selection(selection=[('rojo','Color rojo'), ('verde','Color verde'), ('azul',"Color Azul")],required=True, string='Color RGB') 

    # el campo fecha es obligatorio y es de tipo date, el string es el nombre que se le da al campo en la interfaz
    fecha = fields.Date(required=True, string='Fecha')

    # el campo fecha_hora es obligatorio y es de tipo datetime, el string es el nombre que se le da al campo en la interfaz
    fecha_hora = fields.Datetime(required=True, string='Fecha y hora')
    
    # el campo numero es obligatorio y es de tipo integer, el string es el nombre que se le da al campo en la interfaz
    numero = fields.Integer(required=True, string='Numero')
    
    # el campo numero_decimal es obligatorio y es de tipo float, el string es el nombre que se le da al campo en la interfaz
    numero_decimal = fields.Float(required=True, string='Numero decimal')
    
    # el campo texto es obligatorio y es de tipo text, el string es el nombre que se le da al campo en la interfaz
    texto = fields.Text(required=True, string='Texto')
    
    # el campo booleano es obligatorio y es de tipo boolean, el string es el nombre que se le da al campo en la interfaz
    booleano = fields.Boolean(required=True, string='Booleano')
    
    fecha_salida = fields.Date(required=True, string='Fecha de salida')
    
    # el campo many2one es obligatorio y es de tipo many2one, 
    # el string es el nombre que se le da al campo en la interfaz
    # el comodel_name es el modelo con el que se relaciona, en este caso es el mismo modelo, por lo que se pone el nombre de la clase
    # el ondelete es la accion que se realiza cuando se borra el registro con el que se relaciona, en este caso se borra el registro con el que se relaciona
    # el string es el nombre que se le da a la relacion en la interfaz
    id_cliente = fields.Many2one(comodel_name='plantilla', 
                                ondelete='cascade', 
                                string='Many2one_id_cliente')

    # en la otra parte de la relacion se pone el inverse_name, 
    # que es el campo con el que se relaciona en el otro modelo, en este caso es many2one
    # el one2many es obligatorio y es de tipo one2many, el string es el nombre que se le da al campo en la interfaz
    # el comodel_name es el modelo con el que se relaciona, en este caso es el mismo modelo, por lo que se pone el nombre de la clase
    # el inverse_name es el campo con el que se relaciona en el otro modelo, en este caso es many2one
    # el string es el nombre que se le da a la relacion en la interfaz
    id_vendedor = fields.One2many(comodel_name='plantilla', 
                                inverse_name='id_cliente', 
                                string='One2many_id_vendedor')
    
    # el campo many2many es obligatorio y es de tipo many2many, 
    # el string es el nombre que se le da al campo en la interfaz
    # el comodel_name es el modelo con el que se relaciona, en este caso es el mismo modelo, por lo que se pone el nombre de la clase
    # el relation es el nombre de la tabla que se crea para relacionar los registros, en este caso se llama plantilla_plantilla_rel
    # el column1 es el nombre del campo de la tabla que se crea para relacionar los registros que se relaciona con el modelo actual, en este caso es id_cliente
    # el column2 es el nombre del campo de la tabla que se crea para relacionar los registros que se relaciona con el modelo con el que se relaciona, en este caso es id_vendedor
    # el string es el nombre que se le da a la relacion en la interfaz
    id_proveedor = fields.Many2many(comodel_name='plantilla', 
                                    relation='plantilla_plantilla_rel', 
                                    column1='id_cliente', 
                                    column2='id_vendedor', 
                                    string='Many2many_id_proveedor')
    
    
    # restricción de campos en el modelo @api.constraints añade un decorador (for record in self) cuando se crea un objeto, 
    # los datos se guardan en self -> record, en realidad no es un bucle, solo se ejecuta una vez; el registro que se está guardando en ese momento. 
    # El record es el objeto que se está guardando de la clase cliente, poniendo el .edad se accede al campo edad 
    # y si se quiere acceder a más campos hay que ponerlos en la lista, @api.constraints('edad', 'nombre', ...)
    # api constraits es una funcion que se ejecuta al llamarla, en este caso se ejecuta cuando se crea un objeto
    @api.constrains('edad', 'name') 
    def _check_edad(self):
        for record in self:
            if record.edad < 18:
                raise models.ValidationError('El cliente ' + record.name + ' debe ser mayor de edad')
            elif record.edad > 100:
                raise models.ValidationError('El cliente ' + record.name + ' no puede tener mas de 100 años')
            else:
                pass
    
    
    # api.depends es una funcion que se ejecuta al llamarla para los campos calculados, en este caso se ejecuta cuando se cambia el valor de los campos peso o altura
    # el campo imc es calculado y se almacena en la base de datos
    imc = fields.Float(compute='_compute_imc', store=True) # el campo imc es calculado y se almacena en la base de datos
    @api.depends('peso', 'altura') # dependencias del campo imc
    def _compute_imc(self):
        for record in self:
            if record.altura > 0 and record.peso > 0:
                record.imc = record.peso / record.altura ** 2
            else:
                record.imc = 0
