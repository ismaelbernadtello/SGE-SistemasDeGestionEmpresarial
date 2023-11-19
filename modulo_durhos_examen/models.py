from odoo import api, models, fields


class Metal(models.Model):
    _name = 'modulo_durhos_examen.metal'
    _description = 'Clase para el metal'
    nombre = fields.Char('Nombre', required=True)


class Modelo(models.Model):
    _name = 'modulo_durhos_examen.modelo'
    _description = 'Clase para el modelo'
    cod = fields.Integer('codigoModelo', required=True)
    unidad = fields.Char()
    diametro = fields.Integer()
    peso = fields.Integer()
    re = fields.Many2many(comodel_name='modulo_durhos_examen.metal', 
                        relation='modelo_metal', 
                        string='Metal/Metales',
                        column1='modelo.cod',
                        column2='metal.nombre')

class Molde(models.Model):
    _name = 'modulo_durhos_examen.molde'
    codigo = fields.Integer(string='codigoModelo',required=True)
    anyo_acunacion = fields.Date(string='Año de acuñación')
    descripcion = fields.Char()
    fecha_estrellas = fields.Date(string='Fecha de estrellas')

class Moneda(models.Model):
    _name = 'modulo_durhos_examen.moneda'
    codigo = fields.Integer(string='codigoMoneda',required=True)
    es_variante = fields.Boolean(string='Es variante')
    desc_error = fields.Char(string='Descripción del error')
