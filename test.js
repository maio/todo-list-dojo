/* TEST SUITE */
$(function () {
    test();
});

function test() {
    var jasmineEnv = jasmine.getEnv();
    jasmineEnv.updateInterval = 1000;
    var trivialReporter = new jasmine.TrivialReporter();
    jasmineEnv.addReporter(trivialReporter);
    jasmineEnv.execute();
    var original_confirm = window.confirm;
    window.confirm = function() {
        return 1;
    }
    test_add_task("Task2");
    test_add_task("Task to be deleted");
    $(".unfinished ul li:contains(Task2) input").trigger("click");
    $(".unfinished ul li:contains(Task to be deleted) a").trigger("click");
    window.confirm = original_confirm;
}

function test_add_task(task_name) {
    $("form input[type=text]").val(task_name);
    $("form").submit();
}

describe("todo_list", function() {
    it("should create a task", function() {
        test_add_task("Test task");
        var test_task_count = $(".unfinished ul li:contains(Test task)").size();
        expect(test_task_count).toBe(1);
    });
});
