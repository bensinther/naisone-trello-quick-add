(function () {
  'use strict';

  describe('service trelloService', function () {
    var $httpBackend;
    var TrelloService;

    beforeEach(module('n1ElectronTrelloTodo'));
    beforeEach(inject(function (_TrelloService_, _$httpBackend_) {
      $httpBackend = _$httpBackend_;
      TrelloService = _TrelloService_;
    }));

    it('should be registered', function () {
      expect(TrelloService).not.toEqual(null);
    });

    //////////////////////////

    describe('mandatory variables should be defined', function () {
      it('userState', function () {
        expect(TrelloService.userState).toBeDefined();
        expect(TrelloService.userState).toEqual(jasmine.any(Object));
      });
    });


    //////////////////////////

    describe('getBoards function', function () {

      it('should exist', function () {
        expect(TrelloService.getBoards).toBeDefined();
        expect(typeof TrelloService.getBoards).toEqual("function");
      });

      it('should return data', function () {

        $httpBackend.whenGET(/members\/me\/boards\?key\=/).respond(getBoardsSampleData());
        var data;

        TrelloService.getBoards().then(function (fetchedData) {
          data = fetchedData.data;
        });

        $httpBackend.flush();

        if (data != null) {
          expect(data).toEqual(jasmine.any(Array));
          expect(data.length === 3).toBeTruthy();
          expect(data[0]).toEqual(jasmine.any(Object));
        }

      });
    });

    //////////////////////////

    describe('getLists function', function () {

      it('should exist', function () {
        expect(TrelloService.getLists).toBeDefined();
        expect(typeof TrelloService.getLists).toEqual("function");
      });

      it('should return data', function () {

        $httpBackend.whenGET(/\/lists\?key\=/).respond(getListsSampleData());
        var data;

        TrelloService.getLists().then(function (fetchedData) {
          data = fetchedData.data;
        });

        $httpBackend.flush();

        expect(data).toEqual(jasmine.any(Array));
        expect(data.length === 6).toBeTruthy();
        expect(data[0]).toEqual(jasmine.any(Object));

      });
    });

    //////////////////////////

    describe('addCard function', function () {
      it('should exist', function () {
        expect(TrelloService.addCard).toBeDefined();
        expect(typeof TrelloService.addCard).toEqual("function");
      });

      it('should respond data', function () {
        $httpBackend.whenPOST(/\/cards\?key\=/).respond(getAddCardSampleData());
        var data;

        TrelloService.addCard("test", "test").then(function (fetchedData) {
          data = fetchedData.data;
        });

        $httpBackend.flush();

        expect(data).toEqual(jasmine.any(Object));
      });
    });

    //////////////////////////

    describe('authorize function', function () {
      it('should exist', function () {
        expect(TrelloService.authorize).toBeDefined();
        expect(typeof TrelloService.authorize).toEqual("function");
      });
    });
  });

  //////////////////////////

  function getBoardsSampleData() {
    return [{
      "name": "002 Appollo App System",
      "desc": "",
      "descData": null,
      "closed": false,
      "idOrganization": "527cff9ae12bcd9d1a0044c9",
      "pinned": null,
      "invitations": null,
      "shortLink": "ZFy4cf1d",
      "powerUps": [],
      "dateLastActivity": "2013-12-05T07:54:56.788Z",
      "idTags": [],
      "id": "527d00b321aa439b3d002084",
      "invited": false,
      "starred": false,
      "url": "https://trello.com/b/ZFy4cf1d/002-appollo-app-system",
      "prefs": {
        "permissionLevel": "org",
        "voting": "disabled",
        "comments": "members",
        "invitations": "members",
        "selfJoin": false,
        "cardCovers": true,
        "cardAging": "regular",
        "calendarFeedEnabled": false,
        "background": "blue",
        "backgroundColor": "#0079BF",
        "backgroundImage": null,
        "backgroundImageScaled": null,
        "backgroundTile": false,
        "backgroundBrightness": "unknown",
        "canBePublic": true,
        "canBeOrg": true,
        "canBePrivate": true,
        "canInvite": true
      },
      "memberships": [
        {
          "id": "527d00b321aa439b3d002088",
          "idMember": "527cff14ebc8a340420020db",
          "memberType": "admin",
          "unconfirmed": false,
          "deactivated": false
        },
        {
          "id": "527d00ed6db763c93d0044e3",
          "idMember": "5272a8e262865d9173002b7e",
          "memberType": "normal",
          "unconfirmed": false,
          "deactivated": false
        },
        {
          "id": "527d00ed820602ff3d0048a0",
          "idMember": "527cfdd967a82af642004831",
          "memberType": "normal",
          "unconfirmed": false,
          "deactivated": false
        }
      ],
      "subscribed": false,
      "labelNames": {
        "green": "",
        "yellow": "",
        "orange": "",
        "red": "",
        "purple": "",
        "blue": "",
        "sky": "",
        "lime": "",
        "pink": "",
        "black": ""
      },
      "dateLastView": "2015-10-05T07:22:55.564Z",
      "shortUrl": "https://trello.com/b/ZFy4cf1d"
    },
      {
        "name": "015 AOK Design",
        "desc": "",
        "descData": null,
        "closed": true,
        "idOrganization": null,
        "pinned": null,
        "invitations": null,
        "shortLink": "4okovtFA",
        "powerUps": [],
        "dateLastActivity": "2013-11-22T16:22:19.377Z",
        "idTags": [],
        "id": "5272a92ecc6b3b337f00638a",
        "invited": false,
        "starred": false,
        "url": "https://trello.com/b/4okovtFA/015-aok-design",
        "prefs": {
          "permissionLevel": "private",
          "voting": "disabled",
          "comments": "members",
          "invitations": "members",
          "selfJoin": false,
          "cardCovers": true,
          "cardAging": "regular",
          "calendarFeedEnabled": false,
          "background": "blue",
          "backgroundColor": "#0079BF",
          "backgroundImage": null,
          "backgroundImageScaled": null,
          "backgroundTile": false,
          "backgroundBrightness": "unknown",
          "canBePublic": true,
          "canBeOrg": true,
          "canBePrivate": true,
          "canInvite": true
        },
        "memberships": [
          {
            "id": "5272a92ecc6b3b337f00638e",
            "idMember": "5272a8e262865d9173002b7e",
            "memberType": "admin",
            "unconfirmed": false,
            "deactivated": false
          }
        ],
        "subscribed": false,
        "labelNames": {
          "green": "",
          "yellow": "",
          "orange": "",
          "red": "",
          "purple": "",
          "blue": "",
          "sky": "",
          "lime": "",
          "pink": "",
          "black": ""
        },
        "dateLastView": "2014-04-11T08:37:24.804Z",
        "shortUrl": "https://trello.com/b/4okovtFA"
      },
      {
        "name": "017 Ozarcs",
        "desc": "",
        "descData": null,
        "closed": true,
        "idOrganization": null,
        "pinned": null,
        "invitations": null,
        "shortLink": "nPrc7yql",
        "powerUps": [],
        "dateLastActivity": null,
        "idTags": [],
        "id": "529ca867811be4361c004975",
        "invited": false,
        "starred": false,
        "url": "https://trello.com/b/nPrc7yql/017-ozarcs",
        "prefs": {
          "permissionLevel": "private",
          "voting": "disabled",
          "comments": "members",
          "invitations": "members",
          "selfJoin": false,
          "cardCovers": true,
          "cardAging": "regular",
          "calendarFeedEnabled": false,
          "background": "blue",
          "backgroundColor": "#0079BF",
          "backgroundImage": null,
          "backgroundImageScaled": null,
          "backgroundTile": false,
          "backgroundBrightness": "unknown",
          "canBePublic": true,
          "canBeOrg": true,
          "canBePrivate": true,
          "canInvite": true
        },
        "memberships": [
          {
            "id": "529ca867811be4361c004979",
            "idMember": "5272a8e262865d9173002b7e",
            "memberType": "admin",
            "unconfirmed": false,
            "deactivated": false
          }
        ],
        "subscribed": false,
        "labelNames": {
          "green": "",
          "yellow": "",
          "orange": "",
          "red": "",
          "purple": "",
          "blue": "",
          "sky": "",
          "lime": "",
          "pink": "",
          "black": ""
        },
        "dateLastView": "2014-03-26T11:53:37.095Z",
        "shortUrl": "https://trello.com/b/nPrc7yql"
      }]
  }

  function getListsSampleData() {
    return [
      {
        "id": "533d2878d315d6cd21e71f63",
        "name": "Generell",
        "closed": false,
        "idBoard": "533d273eef11bb305a65d526",
        "pos": 131071,
        "subscribed": false
      },
      {
        "id": "53b07de1e0d3ba886053da85",
        "name": "Todos",
        "closed": false,
        "idBoard": "533d273eef11bb305a65d526",
        "pos": 344063,
        "subscribed": false
      },
      {
        "id": "53b07c6eb1728a32f3623f15",
        "name": "Billomat Invoice Downloader",
        "closed": false,
        "idBoard": "533d273eef11bb305a65d526",
        "pos": 385023,
        "subscribed": false
      },
      {
        "id": "533eb9da968bdb7638659900",
        "name": "Fragen",
        "closed": false,
        "idBoard": "533d273eef11bb305a65d526",
        "pos": 434175,
        "subscribed": false
      },
      {
        "id": "533d274eb4bca1f350bc573c",
        "name": "Opportunities",
        "closed": false,
        "idBoard": "533d273eef11bb305a65d526",
        "pos": 499711,
        "subscribed": false
      },
      {
        "id": "53a3d582bc9114fe83f61a07",
        "name": "VMU - 404",
        "closed": false,
        "idBoard": "533d273eef11bb305a65d526",
        "pos": 565247,
        "subscribed": false
      }
    ];
  }

  function getAddCardSampleData() {
    return {
      "id": "56328dbefa7b7eb0053ac51f",
      "badges": {
        "votes": 0,
        "viewingMemberVoted": false,
        "subscribed": false,
        "fogbugz": "",
        "checkItems": 0,
        "checkItemsChecked": 0,
        "comments": 0,
        "attachments": 0,
        "description": true,
        "due": null
      },
      "checkItemStates": [],
      "closed": false,
      "dateLastActivity": "2015-10-29T21:21:02.135Z",
      "desc": "test",
      "descData": {"emoji": {}},
      "due": null,
      "email": "bensinther+5272a8e262865d9173002b7e+56328dbefa7b7eb0053ac51f+8eb8b43b636b4a64115d65f307122e12eb5a8abd@boards.trello.com",
      "idBoard": "533d273eef11bb305a65d526",
      "idChecklists": [],
      "idLabels": [],
      "idList": "533d2878d315d6cd21e71f63",
      "idMembers": [],
      "idShort": 98,
      "idAttachmentCover": null,
      "manualCoverAttachment": false,
      "labels": [],
      "name": "Test Trello",
      "pos": 720895,
      "shortUrl": "https://trello.com/c/edmRtvZv",
      "url": "https://trello.com/c/edmRtvZv/98-test-trello",
      "stickers": []
    }
  }
})();
