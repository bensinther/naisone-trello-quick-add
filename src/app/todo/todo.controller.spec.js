(function() {
  'use strict';

  describe('controllers', function(){
    var vm;

    beforeEach(module('n1ElectronTrelloTodo'));
    beforeEach(inject(function (_$controller_, _$rootScope_) {
      vm = _$controller_('TodoController', {$scope:  _$rootScope_.$new()});
    }));

    it('should have an array of boards and lists', function () {
      expect(angular.isArray(vm.boards)).toBeTruthy();
      expect(angular.isArray(vm.lists)).toBeTruthy();
      expect(vm.title).toBeNull();
      expect(vm.title).toBeDefined();
      expect(vm.desc).toBeNull();
      expect(vm.desc).toBeDefined();
    });

    it('should have the trelloService as dependency', function () {
      expect(vm.getBoards).toBeDefined();
      expect(vm.authorize).toBeDefined();
      expect(vm.addCard).toBeDefined();

      expect(typeof vm.getBoards).toEqual("function");
      expect(typeof vm.authorize).toEqual("function");
      expect(typeof vm.addCard).toEqual("function");
    });
  });
})();
