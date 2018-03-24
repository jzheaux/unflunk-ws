var Sequelize = require("sequelize")
	, sequelize = new Sequelize('unflunkme', 'root', 'QDuQuxGBcr5JabP5', {
		dialect : "mysql",
		port : 3306
	});
	
sequelize
	.authenticate()
	.complete(function(err) {
		if (!!err) {
			console.log('Unable to connect to the database:', err)
		} else {
			console.log('Connection has been established successfully.')
		}
	});
	
exports.User = sequelize.import(__dirname + '/model/user');
exports.Token = sequelize.import(__dirname + '/model/token');
exports.Role = sequelize.import(__dirname + '/model/role');
exports.Agency = sequelize.import(__dirname + '/model/agency');
exports.Subscription = sequelize.import(__dirname + '/model/subscription');
exports.SubscriptionRoleGrant = sequelize.import(__dirname + '/model/subscription-role-grant');
exports.SubscriptionContentGrant = sequelize.import(__dirname + '/model/subscription-content-grant');
exports.SubscriptionUsageGrant = sequelize.import(__dirname + '/model/subscription-usage-grant');
exports.UserSubscription = sequelize.import(__dirname + '/model/user-subscription');
exports.Content = sequelize.import(__dirname + '/model/content');
exports.ContentLibrary = sequelize.import(__dirname + '/model/content-library');
exports.Session = sequelize.import(__dirname + '/model/session');
exports.SessionUser = sequelize.import(__dirname + '/model/session-user');
exports.EventSeries = sequelize.import(__dirname + '/model/event-series');
exports.Event = sequelize.import(__dirname + '/model/event');
exports.EventUserInvitation = sequelize.import(__dirname + '/model/event-user-invitation');

exports.User.hasMany(exports.Role);
exports.User.hasMany(exports.SessionUser);
exports.User.hasMany(exports.UserSubscription);
exports.User.hasMany(exports.Token);
exports.Role.hasMany(exports.User);

exports.Agency.hasMany(exports.Subscription);
exports.Subscription.belongsTo(exports.Agency);
exports.Agency.hasMany(exports.ContentLibrary);
exports.ContentLibrary.belongsTo(exports.Agency);

exports.Role.hasMany(exports.SubscriptionRoleGrant);
exports.SubscriptionRoleGrant.hasOne(exports.Role);

exports.Subscription.hasMany(exports.SubscriptionRoleGrant);
exports.SubscriptionRoleGrant.belongsTo(exports.Subscription);

exports.Subscription.hasMany(exports.SubscriptionContentGrant);
exports.SubscriptionContentGrant.belongsTo(exports.Subscription);
exports.SubscriptionContentGrant.belongsTo(exports.Content);

// maybe we want content library grants?

exports.Subscription.hasMany(exports.SubscriptionUsageGrant);
exports.SubscriptionUsageGrant.belongsTo(exports.Subscription);
exports.SubscriptionUsageGrant.hasOne(exports.User); // nullable : true

exports.UserSubscription.belongsTo(exports.User);
exports.UserSubscription.hasMany(exports.SessionUser);

exports.ContentLibrary.hasMany(exports.Content);
exports.Content.belongsTo(exports.ContentLibrary);
exports.Content.hasMany(exports.SubscriptionContentGrant);

exports.Session.hasMany(exports.SessionUser);
exports.SessionUser.belongsTo(exports.Session);
exports.SessionUser.hasOne(exports.User);
exports.SessionUser.hasOne(exports.UserSubscription);

exports.EventSeries.hasMany(exports.Event);
exports.Event.hasOne(exports.EventSeries);

exports.Event.hasOne(exports.Session);
exports.Session.hasOne(exports.Event);
exports.Event.hasOne(exports.User);// for now until I can look up the syntax{ type : exports.User, as : 'Host' });

exports.Event.hasMany(exports.EventUserInvitation)
exports.EventUserInvitation.belongsTo(exports.Event);

//exports.Session.hasMany(exports.Whiteboard);
//exports.Whiteboard.belongsTo(exports.Session);

//exports.Whiteboard.hasMany(exports.WhiteboardEdit);
//exports.WhiteboardEdit.belongsTo(exports.Whiteboard);

//exports.Chat.belongsTo(exports.Session); // ???

sequelize
	.sync()
	.complete(function(err) {
		if ( !!err ) {
			console.log('Error syncing:', err);
		}
	});
