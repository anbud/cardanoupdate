import './home.html'
import './home.scss'

import { Template } from 'meteor/templating'
import { Projects } from '/imports/api/projects/projects'
import { Warnings } from '/imports/api/warnings/warnings';
import { Events } from '/imports/api/events/events'
import { Research } from '/imports/api/research/research'
import { Learn } from '/imports/api/learn/learn'
import { socialResources } from '/imports/api/socialResources/socialResources'
import { UsersStats } from '/imports/api/user/usersStats'
import { Stats } from '/imports/api/stats/stats'
import moment from 'moment'

Template.home.onCreated(function () {
  this.autorun(() => {
    this.subscribe('research')
    this.subscribe('socialResources')
    this.subscribe('projects')
    this.subscribe('events')
    this.subscribe('users')
    this.subscribe('comments')
    this.subscribe('usersStats')
    this.subscribe('warnings')
    this.subscribe('learn')
    this.subscribe('stats')
  })
})

Template.home.helpers({
  // Stats
  totalProject: () => (Stats.findOne('content') || {}).projects,

  totalLearningContent: () => (Stats.findOne('content') || {}).learn,

  totalResearch: () => (Stats.findOne('content') || {}).research,

  resultArgs: () => ({
    types: ['events', 'learn', 'projects', 'research', 'socialResources', 'warnings'],
    searchTerm: undefined,
    displayTypeLabel: true,
    hidePastEvents: true,
    showAddNew: true,
    typeLimit: 6,
    languages: Meteor.user() && Meteor.user().profile && Meteor.user().profile.contentLanguages,
    addNewCallback: () => {
      $('#newModal').modal('show')
    }
  }),
})