# -*- coding: utf-8 -*-
{
    'name': "modulo_durhos_examen",
    'summary': """Modulo para practicar para el examen Durhos""",
    'description': """
        Módulo con ejercicio para practicar para el examen
    """,
    'author': "ismael bernad tello",
    'website': "http://www.salesianos.edu",

    # Categories can be used to filter modules in modules listing
    # Check https://github.com/odoo/odoo/blob/master/openerp/addons/base/module/module_data.xml
    # for the full list
    'category': 'Examen',
    'version': '0.1',

    # any module necessary for this one to work correctly
    'depends': ['base'],

    # always loaded
    'data': [
        'views.xml',
    ],
}
