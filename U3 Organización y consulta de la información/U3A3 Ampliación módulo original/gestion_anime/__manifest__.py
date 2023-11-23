# -*- coding: utf-8 -*-
{
    'name': "gestion_anime",
    'summary': """Modulo para la tarea U3A3 """,
    'description': """
        Modulo para la tarea U3A3 sobre la gestion de animes
    """,
    'author': "ismael bernad tello",
    'website': "http://www.salesianos.edu",

    # Categories can be used to filter modules in modules listing
    # Check https://github.com/odoo/odoo/blob/master/openerp/addons/base/module/module_data.xml
    # for the full list
    'category': 'Tarea',
    'version': '0.1',

    # any module necessary for this one to work correctly
    'depends': ['base'],

    # always loaded
    'data': [
        'views.xml',
    ],
}
