const router = require('express').Router()
const {Comment} = require('../../models')
const withAuth = require('../../utils/auth')
const {post} = require('./userRoutes')

