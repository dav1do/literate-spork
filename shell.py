#!/usr/bin/env python

import os
import readline
from pprint import pprint

from flask import *

# from app import *
# from utils import *
# from models import *

from app import views, models
from app.models import *

os.environ['PYTHONINSPECT'] = 'True'