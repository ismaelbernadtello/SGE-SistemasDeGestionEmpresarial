# -*- coding: utf-8 -*-
{
    'name': "modulo_plantilla",
    'summary': """Plantilla para los modelos""",
    'description': """
        Plantilla para los modelos
    """,
    'author': "ismael bernad",
    'website': "http://www.salesianos.edu",

    # Categories can be used to filter modules in modules listing
    # Check https://github.com/odoo/odoo/blob/master/openerp/addons/base/module/module_data.xml
    # for the full list
    'category': 'Examen',
    'version': '0.2',

    # any module necessary for this one to work correctly
    'depends': ['base' , 'modulo_durhos_examen'], 

    # always loaded
    'data': [
        'views.xml',
    ],
}
