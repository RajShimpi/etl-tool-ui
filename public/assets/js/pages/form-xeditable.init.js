$(function() {
    $.fn.editableform.buttons = '<button type="submit" class="btn btn-success editable-submit btn-sm waves-effect waves-light"><i class="fa fa-check"></i></button><button type="button" class="btn btn-danger editable-cancel btn-sm waves-effect waves-light"><i class="fas fa-times"></i></button>',
        $("#inline-username").editable({ type: "text", pk: 1, name: "username", title: "Enter username", mode: "inline", inputclass: "form-control-sm" }),
        $("#operations1").editable({ type: "text", pk: 1, name: "operations1", title: "Enter operations name", mode: "inline", inputclass: "form-control-sm" }),
        $("#operations2").editable({ type: "text", pk: 1, name: "operations2", title: "Enter operations name", mode: "inline", inputclass: "form-control-sm" }),
        $("#inline-firstname").editable({ validate: function(e) { if ("" == $.trim(e)) return "This field is required" }, mode: "inline", inputclass: "form-control-sm" }),
        $("#inline-sex").editable({
            prepend: "not selected",
            mode: "inline",
            inputclass: "form-select form-select-sm",
            source: [{ value: 1, text: "Male" }, { value: 2, text: "Female" }],
            display: function(t, e) {
                var n = $.grep(e, function(e) { return e.value == t });
                n.length ? $(this).text(n[0].text).css("color", { "": "#98a6ad", 1: "#5fbeaa", 2: "#5d9cec" }[t]) : $(this).empty()
            }
        }),
        $("#inline-group").editable({ showbuttons: !1, mode: "inline", inputclass: "form-select form-select-sm" }),
        $("#inline-dob").editable({ mode: "inline", inputclass: "form-select form-select-sm" }),
        $("#inline-comments").editable({ showbuttons: "bottom", mode: "inline", inputclass: "form-control-sm" }),
        $("#inline-hobbies").editable({
            prepend: "Select Hobbies",
            mode: "inline",
            inputclass: "form-select form-select-sm",
            pk: 3,
            source: [{ value: 1, text: "Reading" }, { value: 2, text: "Coding" }, { value: 3, text: "Designing" }],
            display: function(t, e) {
                var n = $.grep(e, function(e) { return e.value == t });
                n.length ? $(this).text(n[0].text).css("color", { "": "#00659e", 1: "#00659e", 2: "#00659e" }[t]) : $(this).empty()
            }
        })
});