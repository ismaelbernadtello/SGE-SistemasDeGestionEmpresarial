# -*- coding: utf-8 -*-
{
    'name': "gestion_anime",
    'summary': """Modulo original para la tarea U3A2""",
    'description': """
        Modulo original para la tarea U3A2
        Modulo para apuntar los capitulos de anime que vamos viendo de nuestros animes favoritos y puntuarlos
    """,
    'author': "ismael bernad tello",
    'website': "http://www.salesianos.edu",

    # Categories can be used to filter modules in modules listing
    # Check https://github.com/odoo/odoo/blob/master/openerp/addons/base/module/module_data.xml
    # for the full list
    'category': 'Tarea U3A2',
    'version': '0.1',

    # any module necessary for this one to work correctly
    'depends': ['base'],

    # always loaded
    'data': [
        'views.xml',
    ],
}
