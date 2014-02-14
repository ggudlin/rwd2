$(document).ready(function () {

    $(".mojsection").hide();
    $('form').submit(function (e) { e.preventDefault(); return false; });
        
    //DajZadjnePartnere();
    PokaziFilter();
     
    //====================================================== daj listu ...

    $(".partneriicon").on('click', function () {
        DajZadjnePartnere();
    });

    function DajZadjnePartnere() {
        $(".mojsection").hide();
        $("#sectionlista").show();
        var formatiraniHTML = "";
        var i = 0;
        $.ajax({
            url: "http://www.spin.hr/ng/servicezagogu/",
            dataType: 'jsonp',
            jsonp: 'jsoncallback',
            timeout: 10000,
            success: function (data, status) {
                j = ""
                $.each(data, function (i, item) {

                    i = i + 1;
                    if (j != item.trgovina) {

                        if (j != "") {
                            formatiraniHTML = formatiraniHTML + '</div>'
                        }
                        // ovo zaglavlje
                        formatiraniHTML = formatiraniHTML + '<div class="col-md-12"><div class="mojitem clearfix bg-primary" data-id="' + item.trgovinaId + '" >'
                        + '<div class="col-md-10">'
                        + '<span class="glyphicon glyphicon-chevron-down ">  '
                        + item.trgovina
                        + '</span>'
                        + '</div>'
                        + '<span class="col-md-2 "><input type="text" class="form-control nevidljivo"></span> '
                        + '</div></div>';

                        j = item.trgovina;

                        formatiraniHTML = formatiraniHTML + '<div class="nevidljivo trgovinaid' + item.trgovinaId + ' ">'

                     };
                    // ovo su detalji
                    formatiraniHTML = formatiraniHTML + '<div class="forlivesearch"><div class="col-md-4 "><div class="mojitem1 clearfix " data-id="' + item.robaid + '" >'
                        + '<div class="robanaslov">'
                        + item.roba + '<br/>'
                        + '</div>'
                        + '<div class="row"><span class="col-xs-6">'
                        + 'Vrijednost:'
                        + item.netovrijednost
                        + '</span>'
                        + '<span class="col-xs-6">'
                        + 'RUC:'
                        + item.ruc
                        + '</span></div>'
                        + '</div></div></div>';

                    if (i == 3) { formatiraniHTML = formatiraniHTML + '<div class="clearfix"></div>'; i = 0; }

                });
                $("#lista").html(formatiraniHTML);
                $(".mojitem").on('click', function () { $(".trgovinaid" + $(this).attr("data-id")).toggleClass("nevidljivo"); });  
                $(".mojitem1").on('click', function () { $(this).toggleClass("bg-warning"); }); 
	        	$('#search').fastLiveFilter('.forlivesearch');

            },
            error: function (xhr, ajaxOptions, thrownError) {
                alert(thrownError);
            }
        });
    }


    //====================================================== daj filter formu  ...

    $('.prikazifilter').on('click', function () {
        PokaziFilter();
    });


    function PokaziFilter() {
        $(".mojsection").hide();
        $("#sectionfilterforma").show();
    }


    //======================================================   ...



});


