---
title      : PDL Functions
description:
modified   : 2010-09-01 00:47:36
created    : 2010-09-01 00:47:36
viewcount  : 0
id         : 714
gmap       :
tags        :
    - code
    - Perl
    - PDL
stars      :
tmpl       : pdlfuncs
ui         : columnview
---

$filename       [No reference available]
$lut            [No reference available]
$options        [No reference available]
AABlend         [No reference available]
AUTOLOAD        Trys to find a subroutine in PDL::Graphics::TriD when it 
                is not found in this package.
Alpha           [No reference available]
AlphaBlending   [No reference available]
Arc             [No reference available]
Arcs            [No reference available]
Blue            [No reference available]
BoundsSafe      [No reference available]
ButtonPressed    Activates the viewport the mouse is inside when pressed
ButtonRelease   [No reference available]
Cabs            complex  `abs()` (also known as *modulus*)
Cabs2           complex squared `abs()` (also known *squared modulus*)
Cacos           [No reference available]
Cacosh          [No reference available]
Carg            complex argument function ("angle")
Casin           [No reference available]
Casinh          [No reference available]
Catan           [No reference available]
Catanh          [No reference available]
Ccmp            Complex comparison operator (spaceship). It orders by real 
                first, then by imaginary. Hm, but it is mathematical nonsense! 
                Complex numbers cannot be ordered.
Cconj           complex conjugation
Ccos             cos (a) = 1/2 * (exp (a*i) + exp (-a*i))
Ccosh            cosh (a) = (exp (a) + exp (-a)) / 2
Cdiv            complex division
Cexp            exp (a) = exp (real (a)) * (cos (imag (a)) + i * sin(imag (a)))
Char            [No reference available]
CharUp          [No reference available]
Clog            log (a) = log (cabs (a)) + i * carg (a)
Cmul            complex multiplication
ColorAllocate   [No reference available]
ColorAllocateAlpha ..[No reference available]
ColorAllocateAlphas .[No reference available]
ColorAllocates  [No reference available]
ColorClosest    [No reference available]
ColorClosestAlpha ...[No reference available]
ColorClosestHWB [No reference available]
ColorDeallocate [No reference available]
ColorExact      [No reference available]
ColorExactAlpha [No reference available]
ColorResolve    [No reference available]
ColorResolveAlpha ...[No reference available]
ColorTransparent ...
                [No reference available]
ColorsTotal     [No reference available]
CopyRotated     [No reference available]
Cp2r            convert complex numbers in polar (mod,arg) form to
                rectangular form
Cpow            complex `pow()' (`**'-operator)
Cprodover       Project via product to N-1 dimension
Cproj           compute the projection of a complex number to the
                riemann sphere
Cr2p            convert complex numbers in rectangular form to polar
                (mod,arg) form
Croots          Compute the `n' roots of `a'. `n' must be a positive
                integer. The result will always be a complex type!
Cscale          mixed complex/real multiplication
Csin             sin (a) = 1/(2*i) * (exp (a*i) - exp (-a*i))
Csinh            sinh (a) = (exp (a) - exp (-a)) / 2
Csqrt           [No reference available]
Ctan            [No reference available]
Ctanh           [No reference available]
Cursor          [No reference available]
DESTROY         [No reference available]
DashedLine      [No reference available]
DashedLines     [No reference available]
Datatype_conversions ...
                byte|short|ushort|long|longlong|float|double convert
                shorthands
Destroy         [No reference available]
Fill            [No reference available]
FillToBorder    [No reference available]
FilledArc       [No reference available]
FilledArcs      [No reference available]
FilledEllipse   [No reference available]
FilledEllipses  [No reference available]
FilledPolygon   [No reference available]
FilledRectangle [No reference available]
FilledRectangles ...
                [No reference available]
GLinit          GLinit is called internally by a Configure callback in
                Populate. This insures that the required Tk::Frame is
                initialized before the TriD::GL window that will go
                inside.
GetClip         [No reference available]
GetInterlaced   [No reference available]
GetPixel        [No reference available]
GetTransparent  [No reference available]
Green           [No reference available]
Image           [No reference available]
Interlace       [No reference available]
Internal        [No reference available]
Line            [No reference available]
Lines           [No reference available]
MainLoop        Should be used in place of the Tk MainLoop. Handles all
                of the Tk callbacks and calls the appropriate TriD
                display functions.
PDL             Module: the Perl Data Language
PDL::API        Manual: making piddles from Perl and C/XS code
PDL::AutoLoader Module: MatLab style AutoLoader for PDL
PDL::Bad        Module: PDL does process bad values
PDL::BadValues  Manual: Discussion of bad value support in PDL
PDL::Basic      Module: Basic utility functions for PDL
PDL::CallExt    Module: call functions in external shared libraries
PDL::Char       Module: PDL subclass which allows reading and writing
                of fixed-length character strings as byte PDLs
PDL::Complex    Module: handle complex numbers
PDL::Compression ...
                Module: compression utilities
PDL::Core       Module: fundamental PDL functionality
PDL::Core::Dev  Module: PDL development module
PDL::Course     Manual: A journey through PDL's documentation, from
                beginner to advanced.
PDL::Dataflow   Manual: description of the dataflow philosophy
PDL::Dbg        Module: functions to support debugging of PDL scripts
PDL::Delta      Manual: PDL changes between V1.0 and V2.0
PDL::DiskCache  Module: Non-memory-resident array object
PDL::Doc        Module: support for PDL online documentation
PDL::Doc::Perldl ...
                Module: commands for accessing PDL doc database from
                'perldl' shell
PDL::Doc::Perldl::finddoc ...
                Internal interface to the PDL documentation searcher
PDL::Doc::Perldl::search_docs ...
                Internal routine to search docs database and autoload
                files
PDL::Exporter   Module: PDL export control
PDL::FAQ        Manual: Frequently asked questions about PDL
PDL::FFT        Module: FFTs for PDL
PDL::Filter::LinPred ...
                Module: Linear predictive filtering
PDL::Filter::Linear ...
                Module: linear filtering for PDL
PDL::Fit::Gaussian ...
                Module: routines for fitting gaussians
PDL::Fit::LM    Module: Levenberg-Marquardt fitting routine for PDL
PDL::Fit::Linfit ...
                Module: routines for fitting data with linear
                combinations of functions.
PDL::Fit::Polynomial ...
                Module: routines for fitting with polynomials
PDL::Func       Module: useful functions
PDL::Func::attributes ...
                Print out the flags for the attributes of a PDL::Func
                object.
PDL::Func::get  Get attributes from a PDL::Func object.
PDL::Func::gradient ...
                Returns the derivative and, optionally, the
                interpolated function for the `Hermite' scheme
                (PDL::Func).
PDL::Func::init Create a PDL::Func object, which can interpolate, and
                possibly integrate and calculate gradients of a
                dataset.
PDL::Func::integrate ...
                Integrate the function stored in the PDL::Func object,
                if the scheme is `Hermite'.
PDL::Func::interpolate ...
                Returns the interpolated function at a given set of
                points (PDL::Func).
PDL::Func::routine ...
                Returns the name of the last routine called by a
                PDL::Func object.
PDL::Func::scheme ...
                Return the type of interpolation of a PDL::Func object.
PDL::Func::set  Set attributes for a PDL::Func object.
PDL::Func::status ...
                Returns the status of a PDL::Func object.
PDL::GIS::Proj  Module: PDL interface to the Proj4 projection library.
PDL::GSL::DIFF  Module: PDL interface to numerical differentiation
                routines in GSL
PDL::GSL::INTEG Module: PDL interface to numerical integration routines
                in GSL
PDL::GSL::INTERP ...
                Module: PDL interface to Interpolation routines in GSL
PDL::GSL::MROOT Module: PDL interface to multidimensional root-finding
                routines in GSL
PDL::GSL::RNG   Module: PDL interface to RNG and randist routines in
                GSL
PDL::GSLSF::AIRY ...
                Module: PDL interface to GSL Special Functions
PDL::GSLSF::BESSEL ...
                Module: PDL interface to GSL Special Functions
PDL::GSLSF::CLAUSEN ...
                Module: PDL interface to GSL Special Functions
PDL::GSLSF::COULOMB ...
                Module: PDL interface to GSL Special Functions
PDL::GSLSF::COUPLING ...
                Module: PDL interface to GSL Special Functions
PDL::GSLSF::DAWSON ...
                Module: PDL interface to GSL Special Functions
PDL::GSLSF::DEBYE ...
                Module: PDL interface to GSL Special Functions
PDL::GSLSF::DILOG ...
                Module: PDL interface to GSL Special Functions
PDL::GSLSF::ELEMENTARY ...
                Module: PDL interface to GSL Special Functions
PDL::GSLSF::ELLINT ...
                Module: PDL interface to GSL Special Functions
PDL::GSLSF::ELLJAC ...
                Module: PDL interface to GSL Special Functions
PDL::GSLSF::ERF Module: PDL interface to GSL Special Functions
PDL::GSLSF::EXP Module: PDL interface to GSL Special Functions
PDL::GSLSF::EXPINT ...
                Module: PDL interface to GSL Special Functions
PDL::GSLSF::FERMI_DIRAC ...
                Module: PDL interface to GSL Special Functions
PDL::GSLSF::GAMMA ...
                Module: PDL interface to GSL Special Functions
PDL::GSLSF::GEGENBAUER ...
                Module: PDL interface to GSL Special Functions
PDL::GSLSF::HYPERG ...
                Module: PDL interface to GSL Special Functions
PDL::GSLSF::LAGUERRE ...
                Module: PDL interface to GSL Special Functions
PDL::GSLSF::LEGENDRE ...
                Module: PDL interface to GSL Special Functions
PDL::GSLSF::LOG Module: PDL interface to GSL Special Functions
PDL::GSLSF::POLY ...
                Module: PDL interface to GSL Special Functions
PDL::GSLSF::POW_INT ...
                Module: PDL interface to GSL Special Functions
PDL::GSLSF::PSI Module: PDL interface to GSL Special Functions
PDL::GSLSF::SYNCHROTRON ...
                Module: PDL interface to GSL Special Functions
PDL::GSLSF::TRANSPORT ...
                Module: PDL interface to GSL Special Functions
PDL::GSLSF::TRIG ...
                Module: PDL interface to GSL Special Functions
PDL::GSLSF::ZETA ...
                Module: PDL interface to GSL Special Functions
PDL::Graphics2D Module: An object oriented interface to PDL graphics
PDL::Graphics::IIS ...
                Module: Display PDL images on IIS devices
                (saoimage/ximtool)
PDL::Graphics::Karma ...
                Module: interface to Karma visualisation applications
PDL::Graphics::LUT ...
                Module: provides access to a number of look-up tables
PDL::Graphics::Limits ...
                Module: derive limits for display purposes
PDL::Graphics::OpenGL::Perl::OpenGL ...
                Module: PDL TriD OpenGL interface using POGL
PDL::Graphics::OpenGLQ ...
                Module: quick routines to plot lots of stuff from
                piddles.
PDL::Graphics::PGPLOT ...
                Module: PGPLOT enhanced interface for PDL
PDL::Graphics::PGPLOT::Window ...
                Module: A OO interface to PGPLOT windows
PDL::Graphics::PGPLOTOptions ...
                Module: Setting PGPLOT options
PDL::Graphics::PLplot ...
                Module: Object-oriented interface from perl/PDL to the
                PLPLOT plotting library
PDL::Graphics::TriD ...
                Module: PDL 3D interface
PDL::Graphics::TriD::ButtonControl ...
                Module: default event handler subroutines
PDL::Graphics::TriD::Contours ...
                Module: 3D Surface contours for TriD
PDL::Graphics::TriD::Labels ...
                Module: Text tools
PDL::Graphics::TriD::MathGraph ...
                Module: Mathematical Graph objects for PDL
PDL::Graphics::TriD::Objects ...
                Module: Simple Graph Objects for TriD
PDL::Graphics::TriD::Rout ...
                Module: Helper routines for Three-dimensional graphics
PDL::Graphics::TriD::Tk ...
                Module: A Tk widget interface to the
                PDL::Graphics::TriD.
PDL::Graphics::TriD::VRML ...
                Module: TriD VRML backend
PDL::IO         Manual: An overview of the modules in the PDL::IO
                namespace.
PDL::IO::Browser ...
                Module: 2D data browser for PDL
PDL::IO::Dumper Module: data dumping for structs with PDLs
PDL::IO::Dumper::big_PDL ...
                Identify whether a PDL is ``big'' [Internal routine]
PDL::IO::Dumper::dump_PDL ...
                Generate 1- or 2-part expr for a PDL [Internal routine]
PDL::IO::Dumper::find_PDLs ...
                Walk a data structure and dump PDLs [Internal routine]
PDL::IO::Dumper::stringify_PDL ...
                Turn a PDL into a 1-part perl expr [Internal routine]
PDL::IO::Dumper::uudecode_PDL ...
                Recover a PDL from a uuencoded string [Internal
                routine]
PDL::IO::FITS   Module: Simple FITS support for PDL
PDL::IO::FastRaw ...
                Module: A simple, fast and convenient io format for
                PerlDL.
PDL::IO::FlexRaw ...
                Module: A flexible binary i/o format for PerlDL.
PDL::IO::GD     Module: Interface to the GD image library.
PDL::IO::Misc   Module: misc IO routines for PDL
PDL::IO::NDF    Module: PDL Module for reading and writing Starlink
PDL::IO::Pic    Module: image I/O for PDL
PDL::IO::Pnm    Module: pnm format I/O for PDL
PDL::IO::Storable ...
                Module: helper functions to make PDL usable with
                Storable
PDL::Image2D    Module: Miscellaneous 2D image processing functions
PDL::ImageND    Module: useful image processing in N dimensions
PDL::ImageRGB   Module: some utility functions for RGB image data
                handling
PDL::Indexing   Manual: Introduction to indexing and slicing piddles.
PDL::Internals  Manual: description of some aspects of the current
                internals
PDL::Lite       Module: minimum PDL module OO loader
PDL::LiteF      Module: minimum PDL module function loader
PDL::Lvalue     Module: declare PDL lvalue subs
PDL::MATLAB     Manual: A guide for MATLAB users.
PDL::Math       Module: extended mathematical operations and special
                functions
PDL::Matrix     Module: a convenience matrix class for column-major
                access
PDL::Matrix::crossp ...
                similar to PDL::crossp, however reflecting PDL::Matrix
                notations
PDL::Matrix::pdl ...
                constructs an object of class PDL::Matrix which is a
                piddle child class.
PDL::MatrixOps  Module: Some Useful Matrix Operations
PDL::Modules    Manual: A guide to PDL's module reference.
PDL::NiceSlice  Module: toward a nicer slicing syntax for PDL
PDL::Objects    Manual: Object-Orientation, what is it and how to
                exploit it
PDL::Ops        Module: Fundamental mathematical operators
PDL::Opt::Simplex ...
                Module: Simplex optimization routines
PDL::Options    Module: simplifies option passing by hash in PerlDL
PDL::PP         Manual: Generate PDL routines from concise descriptions
PDL::Perldl2::Plugin::NiceSlice ...
                Module: enable PDL NiceSlice syntax
PDL::Perldl2::Plugin::PDLCommands ...
                Module: implement perldl aliases/escapes
PDL::Perldl2::Plugin::PrintControl ...
                Module: disable default print output
PDL::Perldl2::Profile::Perldl2 ...
                Module: profile for Perldl2 shell
PDL::Philosophy Manual: Why did we write PDL?
PDL::Primitive  Module: primitive operations for pdl
PDL::QuickStart Manual: Quick introduction to PDL features.
PDL::Reduce     Module: a `reduce' function for PDL
PDL::Scilab     Manual: A guide for Scilab users.
PDL::Slices     Module: Indexing, slicing, and dicing
PDL::Tests      Module: tests for some PP features
PDL::Threading  Manual: Tutorial for PDL's Threading feature
PDL::Tips       Manual: Small tidbits of useful arcana. Programming
                tidbits and such.
PDL::Transform  Module: Coordinate transforms, image warping, and N-D
                functions
PDL::Transform::Cartography ...
                Module: Useful cartographic projections
PDL::Transform::Proj4 ...
                Module: PDL::Transform interface to the Proj4
                projection library
PDL::Tutorials  Manual: A guide to PDL's tutorial documentation.
PDL::Types      Module: define fundamental PDL Datatypes
PDL::Ufunc      Module: primitive ufunc operations for pdl
PDL::get_datatype ...
                Internal: Return the numeric value identifying the
                piddle datatype
PDL::hdr_copy   Return an explicit copy of the header of a PDL.
PDL::info       Return formatted information about a piddle.
PDL::make_physical ...
                Make sure the data portion of a piddle can be accessed
                from XS code.
PDL::match      Resample a scientific image to the same coordinate
                system as another.
PDL::new        new piddle constructor method
PDL::new_from_specification ...
                Internal method: create piddle by specification
PDL::thread     Use explicit threading over specified dimensions (see
                also the PDL::Indexing manpage)
PDL::thread1    Explicit threading over specified dims using thread id
                1.
PDL::thread2    Explicit threading over specified dims using thread id
                2.
PDL::thread3    Explicit threading over specified dims using thread id
                3.
PDL::threadids  Returns the piddle thread IDs as a perl list
PDL::unwind     Return a piddle which is the same as the argument
                except that all threadids have been removed.
Plotting        [No reference available]
Polygon         [No reference available]
Populate        Used for widget initialization by Tk, this function
                should never be called directly
Rectangle       [No reference available]
Rectangles      [No reference available]
Red             [No reference available]
SX              [No reference available]
SY              [No reference available]
SaveAlpha       [No reference available]
SetAntiAliased  [No reference available]
SetAntiAliasedDontBlend ...
                [No reference available]
SetBrush        [No reference available]
SetClip         [No reference available]
SetPixel        [No reference available]
SetPixels       [No reference available]
SetStyle        [No reference available]
SetThickness    [No reference available]
SetTile         [No reference available]
String          [No reference available]
String16        [No reference available]
StringFT        [No reference available]
StringTTF       [No reference available]
StringUp        [No reference available]
StringUp16      [No reference available]
TBD             [No reference available]
TIEARRAY        Tied-array constructor; invoked by perl during object
                construction.
Text            [No reference available]
TrueColor       [No reference available]
TrueColorToPalette ...
                [No reference available]
WARNING:        [No reference available]
Window          [No reference available]
XPending        [No reference available]
XResizeWindow   [No reference available]
[$window_type]) [No reference available]
_FITS_tr        [No reference available]
_advance_panel  [No reference available]
_check_move_or_erase ...
                [No reference available]
_checkarg       [No reference available]
_extract_hash   [No reference available]
_get_windownumber ...
                [No reference available]
_image_xyrange  [No reference available]
_open_new_window ...
                [No reference available]
_parse_options  [No reference available]
_parse_unit     [No reference available]
_prep_table     Accept a hash ref containing a table, and return a
                header describing the table and a string to be written
                out as the table, or barf.
_read_flexhdr   [No reference available]
_reopen         [No reference available]
_restore_status [No reference available]
_rows           Return the number of rows in a variable for table entry
_save_status    [No reference available]
_set_colour     [No reference available]
_setup_window   [No reference available]
_standard_options_parser ...
                [No reference available]
_status         [No reference available]
_thread_options [No reference available]
abs             elementwise absolute value
acos            The usual trigonometric function. Works inplace.
acosh           The standard hyperbolic function. Works inplace.
addlabels       Add labels to a contour plot
all             Return true if all elements in piddle set
allaxisvals     Synonym for ndcoords - enumerates all coordinates in a
                PDL or dim list, adding an extra dim on the front to
                accomodate the vector coordinate index (the form
                expected by indexND, range, and interpND). See ndcoords
                for more detail.
and             Return the logical and of all elements in a piddle
and2            binary *and* of two piddles
andover         Project via and to N-1 dimensions
any             Return true if any element in piddle set
append          append two or more piddles by concatenating along their
                first dimensions
apply           Apply a transformation to some input coordinates.
apply_lut       [No reference available]
applywarp2d     Transform a set of points using a 2-D polynomial
                mapping
approx          test for approximately equal values (relaxed `==')
apropos         Regex search PDL documentation database
arrow           Plot an arrow
asin            The usual trigonometric function. Works inplace.
asinh           The standard hyperbolic function. Works inplace.
assgn           Plain numerical assignment. This is used to implement
                the ".=" operator
at              Returns a single value inside a piddle as perl scalar.
atan            The usual trigonometric function. Works inplace.
atan2           elementwise `atan2' of two piddles
atanh           The standard hyperbolic function. Works inplace.
atstr           Function to fetch one string value from a PDL::Char
                type PDL, given a position within the PDL. The input
                position of the string, not a character in the string.
                The length of the input string is the implied first
                dimension.
attract         Attractive potential for molecule-like constructs.
autolog         Turn on automatic logarithmic scaling in `line' and
                `points'
average         Project via average to N-1 dimensions
avg             Return the average of all elements in a piddle
axisvals        Fills a piddle with index values on Nth dimension
axisvalues      Internal routine
badflag         switch on/off/examine bad data flag
badinfo         provides information on the bad-value support of a
                function
badmask         Clears all `infs' and `nans' in `$a' to the
                corresponding value in `$b'.
badvalue        returns the value used to indicate a missing (or bad)
                element for the given piddle type. You can give it a
                piddle, a PDL::Type object, or one of `$PDL_B',
                `$PDL_S', etc.
band            Return the bitwise and of all elements in a piddle
bandover        Project via bitwise and to N-1 dimensions
barf            Standard error reporting routine for PDL.
bargraph        Simple utility to plot a bar chart with labels on the X
                axis. The usual options can be specified, plus one
                other: MAXBARLABELS specifies the maximum number of
                labels to allow on the X axis. The default is 20. If
                this value is exceeded, then every other label is
                plotted. If twice MAXBARLABELS is exceeded, then only
                every third label is printed, and so on.
bessj0          The regular Bessel function of the first kind, J_n
                Works inplace.
bessj1          The regular Bessel function of the first kind, J_n
                Works inplace.
bessjn          The regular Bessel function of the first kind, J_n .
                This takes a second int argument which gives the order
                of the function required. Works inplace.
bessy0          The regular Bessel function of the second kind, Y_n.
                Works inplace.
bessy1          The regular Bessel function of the second kind, Y_n.
                Works inplace.
bessyn          The regular Bessel function of the first kind, Y_n .
                This takes a second int argument which gives the order
                of the function required. Works inplace.
bilin2d         Bilinearly maps the first piddle in the second. The
                interpolated values are actually added to the second
                piddle which is supposed to be larger than the first
                one.
bin             Plot vector as histogram (e.g. `bin(hist($data))')
bitnot          unary bit negation
bor             Return the bitwise or of all elements in a piddle
borover         Project via bitwise or to N-1 dimensions
box2d           fast 2D boxcar average
browse          browse a 2D array using terminal cursor keys
bswap2          Swaps pairs of bytes in argument x()
bswap4          Swaps quads of bytes in argument x()
bswap8          Swaps octets of bytes in argument x()
buttonmotion    Default bindings for mousemotion with buttons 1 and 3
byte            Convert to byte datatype - see 'Datatype_conversions'
bytescl         Scales a pdl into a specified data range (default
                0-255)
callext         Call a function in an external library using Perl
                dynamic loading
callext_cc      Compile external C code for dynamic loading
canreduce       return list of valid named `reduce' operations Some
                common operations can be accessed using a number of
                names, e.g. `'+'', `add' and `plus' all sum the
                elements along the chosen dimension.
cat             concatenate piddles to N+1 dimensional piddle
catch_signals   To prevent pgplot from doing a fandango on core, we
                have to block interrupts during PGPLOT calls.
                Specifically, INT needs to get caught. These internal
                routines provide a mechanism for that.
cc8compt        Connected 8-component labeling of a binary image.
cdiv            Complex division
ceil            Round to integer values in floating-point format. Works
                inplace.
centroid2d      Refine a list of object positions in 2D image by
                centroiding in a box
check_badflag   clear the bad-value flag of a piddle if it does not
                contain any bad values
circ_mean       Smooths an image by applying circular mean. Optionally
                takes the center to be used.
circ_mean_p     Calculates the circular mean of an n-dim image and
                returns the projection. Optionally takes the center to
                be used.
circle          Plot a circle on the display using the fill setting.
clean_lines     (Cartography) PDL method - remove projection
                irregularities
clip            Clip (threshold) a piddle by (optional) upper or lower
                bounds.
close           Close a plot window
close_window    Close a PGPLOT output device
clump           "clumps" several dimensions into one large dimension
cmul            Complex multiplication
coldhot_colortable ...
                A simple colortable function for use with the
                set_colortable function.
colorkey        Plot a color key showing which color represents which
                value
combcoords      Combine three coordinates into a single piddle.
complex         [No reference available]
cont            Display image as contour map
contour_segments ...
                This is the interface for the pp routine
                contour_segments_internal - it takes 3 piddles as input
conv1d          1D convolution along first dimension
conv2d          2D convolution of an array with a kernel (smoothing)
convert         Generic datatype conversion function
convmath        Internal routine doing maths for convolution
convolve        N-dimensional convolution (Deprecated; use convolveND)
convolveND      Speed-optimized convolution with selectable boundary
                conditions
copy            Make a physical copy of a piddle
copybad         Copies values from one piddle to another, setting them
                bad if they are bad in the supplied mask.
cos             the cos function
cosh            The standard hyperbolic function. Works inplace.
cplx            [No reference available]
cquant          quantize and reduce colours in 8-bit images
crossp          Cross product of two 3D vectors
ctab            Load an image colour table.
ctab_info       Return information about the currently loaded color
                table
cumuprodover    Cumulative product
cumusumover     Cumulative sum
cursor          Interactively read cursor positions.
daverage        Project via average to N-1 dimensions
davg            Return the average (in double precision) of all
                elements in a piddle
dcumuprodover   Cumulative product
dcumusumover    Cumulative sum
deep_copy       Convenience function copies a complete perl data
                structure by the brute force method of "eval sdump".
default         [No reference available]
default_options [No reference available]
deriv           The deriv function returns the derivative of the
                interpolating function at a given point. By default it
                will barf if you try to extrapolate, to comply silently
                if the point to be evaluated is out of range pass the
                option {Extrapolate => 1}
deriv2          The deriv2 function returns the second derivative of
                the interpolating function at a given point. By default
                it will barf if you try to extrapolate, to comply
                silently if the point to be evaluated is out of range
                pass the option {Extrapolate => 1}
det             Determinant of a square matrix using LU decomposition
                (for large matrices)
det_general     returns a generalized determinant of a matrix. If the
                matrix is not regular, one can specify the rank of the
                matrix and the corresponding subdeterminant is
                returned. This is implemented using the `eigens'
                function.
determinant     Determinant of a square matrix, using recursive descent
                (threadable).
dev             Open PGPLOT graphics device
device          [No reference available]
diagonal        Returns the multidimensional diagonal over the
                specified dimensions.
diagonalI       Returns the multidimensional diagonal over the
                specified dimensions.
dice            Dice rows/columns/planes out of a PDL using indexes for
                each dimension.
dice_axis       Dice rows/columns/planes from a single PDL axis
                (dimension) using index along a specified axis
diff_backward   info not available
diff_central    info not available
diff_forward    info not available
dim             Returns the size of the given dimension of a piddle.
                Alias for getdim.
dims            Return piddle dimensions as a perl list
diskcache       [No reference available]
divide          divide two piddles
do_print        [No reference available]
doflow          Turn on/off dataflow
dog             Opposite of 'cat' :). Split N dim piddle to list of N-1
                dim piddles
double          Convert to double datatype - see 'Datatype_conversions'
dprod           Return the product (in double precision) of all
                elements in a piddle
dprodover       Project via product to N-1 dimensions
draw_wedge      Add a wedge (colour bar) to an image.
dsum            Return the sum (in double precision) of all elements in
                a piddle
dsumover        Project via sum to N-1 dimensions
dummy           Insert a 'dummy dimension' of given length (defaults to
                1)
earth_coast     (Cartography) PDL constructor - coastline map of Earth
earth_image     (Cartography) PDL constructor - RGB pixel map of Earth
eigens          Real eigenvalues and -vectors of a real square matrix.
eigens_sym      Eigenvalues and -vectors of a symmetric square matrix.
                If passed an asymmetric matrix, the routine will warn
                and symmetrize it, by taking the average value. That
                is, it will solve for 0.5*($a+$a->mv(0,1)).
ellipse         Plot an ellipse, optionally using fill style.
env             Define a plot window, and put graphics on 'hold'
eq              binary *equal to* operation (`==')
erase           Erase plot
erf             The error function. Works inplace.
erfc            The complement of the error function. Works inplace.
erfi            The inverse of the error function. Works inplace.
errb            Plot error bars (using `pgerrb()')
eval            The function eval returns the interpolating function at
                a given point. By default it will barf if you try to
                extrapolate, to comply silently if the point to be
                evaluated is out of range pass the option {Extrapolate
                => 1}
exp             the exponential function
fdump           Dump a data structure to a file
fft             Complex FFT of the "real" and "imag" arrays [inplace].
fftconvolve     N-dimensional convolution with periodic boundaries (FFT
                method)
fftnd           N-dimensional FFT (inplace)
fhdr            Retrieve or set FITS header information from a piddle
fibonacci       Constructor - a vector with Fibonacci's sequence
find_autodoc    Internal helper routine that finds and returns
                documentation in the autoloader path, if it exists. You
                feed in a topic and it searches for the file
                "${topic}.pdl". If that exists, then the filename gets
                returned in a match structure appropriate for the rest
                of finddoc.
fitgauss1d      Fit 1D Gassian to data piddle
fitgauss1dr     Fit 1D Gassian to radial data piddle
fitpoly1d       Fit 1D polynomials to data using min chi^2 (least
                squares)
fits_cont       Draw contours of an image, labelling the axes using the
                WCS information in the FITS header of the image.
fits_field_cmp  fits_field_cmp
fits_imag       Display a FITS image with correct axes
fits_rgbi       Display an RGB FITS image with correct axes
fits_vect       Display a pair of 2-D piddles as vectors, with FITS
                header interpretation
fitwarp2d       Find the best-fit 2D polynomial to describe a
                coordinate transformation.
flat            flatten a piddle (alias for `$pdl-'clump(-1)>)
float           Convert to float datatype - see 'Datatype_conversions'
floor           Round to integer values in floating-point format. Works
                inplace.
flows           Whether or not a piddle is indulging in dataflow
focus           [No reference available]
focus_window    Switch to another output window.
freeze          freeze a piddle using Storable
frestore        Restore a dumped file
fsolver_meat    info not available
gdImageAABlend  [No reference available]
gdImageAlpha    [No reference available]
gdImageAlphaBlending ...
                [No reference available]
gdImageArc      [No reference available]
gdImageArcs     [No reference available]
gdImageBlue     [No reference available]
gdImageBoundsSafe ...
                [No reference available]
gdImageChar     [No reference available]
gdImageCharUp   [No reference available]
gdImageColorAllocate ...
                [No reference available]
gdImageColorAllocateAlpha ...
                [No reference available]
gdImageColorAllocateAlphas ...
                [No reference available]
gdImageColorAllocates ...
                [No reference available]
gdImageColorClosest ...
                [No reference available]
gdImageColorClosestAlpha ...
                [No reference available]
gdImageColorClosestHWB ...
                [No reference available]
gdImageColorDeallocate ...
                [No reference available]
gdImageColorExact ...
                [No reference available]
gdImageColorExactAlpha ...
                [No reference available]
gdImageColorResolve ...
                [No reference available]
gdImageColorResolveAlpha ...
                [No reference available]
gdImageColorTransparent ...
                [No reference available]
gdImageColorsTotal ...
                [No reference available]
gdImageCompare  [No reference available]
gdImageCopy     [No reference available]
gdImageCopyMerge ...
                [No reference available]
gdImageCopyMergeGray ...
                [No reference available]
gdImageCopyResampled ...
                [No reference available]
gdImageCopyResized ...
                [No reference available]
gdImageCopyRotated ...
                [No reference available]
gdImageDashedLine ...
                [No reference available]
gdImageDashedLines ...
                [No reference available]
gdImageDestroy  [No reference available]
gdImageFill     [No reference available]
gdImageFillToBorder ...
                [No reference available]
gdImageFilledArc ...
                [No reference available]
gdImageFilledArcs ...
                [No reference available]
gdImageFilledEllipse ...
                [No reference available]
gdImageFilledEllipses ...
                [No reference available]
gdImageFilledPolygon ...
                [No reference available]
gdImageFilledRectangle ...
                [No reference available]
gdImageFilledRectangles ...
                [No reference available]
gdImageGetClip  [No reference available]
gdImageGetInterlaced ...
                [No reference available]
gdImageGetPixel [No reference available]
gdImageGetTransparent ...
                [No reference available]
gdImageGreen    [No reference available]
gdImageInterlace ...
                [No reference available]
gdImageLine     [No reference available]
gdImageLines    [No reference available]
gdImagePaletteCopy ...
                [No reference available]
gdImagePolygon  [No reference available]
gdImageRectangle ...
                [No reference available]
gdImageRectangles ...
                [No reference available]
gdImageRed      [No reference available]
gdImageSX       [No reference available]
gdImageSY       [No reference available]
gdImageSaveAlpha ...
                [No reference available]
gdImageSetAntiAliased ...
                [No reference available]
gdImageSetAntiAliasedDontBlend ...
                [No reference available]
gdImageSetBrush [No reference available]
gdImageSetClip  [No reference available]
gdImageSetPixel [No reference available]
gdImageSetPixels ...
                [No reference available]
gdImageSetStyle [No reference available]
gdImageSetThickness ...
                [No reference available]
gdImageSetTile  [No reference available]
gdImageString   [No reference available]
gdImageString16 [No reference available]
gdImageStringFT [No reference available]
gdImageStringTTF ...
                [No reference available]
gdImageStringUp [No reference available]
gdImageStringUp16 ...
                [No reference available]
gdImageTrueColor ...
                [No reference available]
gdImageTrueColorToPalette ...
                [No reference available]
ge              the binary >= (greater equal) operation
get             This function creates a piddle with given dimensions or
                accept an existing piddle and fills it. get() returns
                integer values beetween a minimum and a maximum
                specific to evry RNG.
get_dataref     Return the internal data for a piddle, as a perl SCALAR
                ref.
get_int         This function creates a piddle with given dimensions or
                accept an existing piddle and fills it. get_int()
                returns integer values beetween 0 and $max.
get_uniform     This function creates a piddle with given dimensions or
                accept an existing piddle and fills it. get_uniform()
                returns values 0<=x<1,
get_uniform_pos This function creates a piddle with given dimensions or
                accept an existing piddle and fills it.
                get_uniform_pos() returns values 0<x<1,
getdim          Returns the size of the given dimension.
gethdr          Retrieve header information from a piddle
getndims        Returns the number of dimensions in a piddle
glXSwapBuffers  [No reference available]
glpRasterFont   [No reference available]
glpXNextEvent   [No reference available]
glue            Glue two or more PDLs together along an arbitrary
                dimension (N-D append).
grabpic3d       Grab a 3D image from the screen.
grandom         Constructor which returns piddle of Gaussian random
                numbers
graticule       (Cartography) PDL constructor - generate a lat/lon
                grid.
gsl_poly_eval   c[0] + c[1] x + c[2] x^2 + ... + c[m-1] x^(m-1)
gsl_sf_Chi      Chi(x) := Re[ M_EULER + log(x) +
                Integrate[(Cosh[t]-1)/t, {t,0,x}] ]
gsl_sf_Ci       Ci(x) := -Integrate[ Cos[t]/t, {t,x,Infinity}]
gsl_sf_Shi      Shi(x) := Integrate[ Sinh[t]/t, {t,0,x}]
gsl_sf_Si       Si(x) := Integrate[ Sin[t]/t, {t,0,x}]
gsl_sf_airy_Ai  Airy Function Ai(x).
gsl_sf_airy_Ai_deriv ...
                Derivative Airy Function Ai`(x).
gsl_sf_airy_Ai_deriv_scaled ...
                Derivative Scaled Airy Function Ai(x). Ai`(x) for x < 0
                and exp(+2/3 x^{3/2}) Ai`(x) for x > 0.
gsl_sf_airy_Ai_scaled ...
                Scaled Airy Function Ai(x). Ai(x) for x < 0 and
                exp(+2/3 x^{3/2}) Ai(x) for x > 0.
gsl_sf_airy_Bi  Airy Function Bi(x).
gsl_sf_airy_Bi_deriv ...
                Derivative Airy Function Bi`(x).
gsl_sf_airy_Bi_deriv_scaled ...
                Derivative Scaled Airy Function Bi(x). Bi`(x) for x < 0
                and exp(+2/3 x^{3/2}) Bi`(x) for x > 0.
gsl_sf_airy_Bi_scaled ...
                Scaled Airy Function Bi(x). Bi(x) for x < 0 and
                exp(+2/3 x^{3/2}) Bi(x) for x > 0.
gsl_sf_angle_restrict_pos ...
                Force an angle to lie in the range [0,2 pi).
gsl_sf_angle_restrict_symm ...
                Force an angle to lie in the range (-pi,pi].
gsl_sf_atanint  AtanInt(x) := Integral[ Arctan[t]/t, {t,0,x}]
gsl_sf_bessel_I_array ...
                Array of Regular Modified Bessel Functions I_{s}(x) to
                I_{s+n-1}(x).
gsl_sf_bessel_I_scaled_array ...
                Array of Scaled Regular Modified Bessel Functions
                exp(-|x|) I_{s}(x) to exp(-|x|) I_{s+n-1}(x).
gsl_sf_bessel_In ...
                Regular Modified Bessel Function I_n(x).
gsl_sf_bessel_In_scaled ...
                Scaled Regular Modified Bessel Function exp(-|x|)
                I_n(x).
gsl_sf_bessel_Inu ...
                Modified Cylindrical Bessel Function I_nu(x).
gsl_sf_bessel_Inu_scaled ...
                Scaled Modified Cylindrical Bessel Function exp(-|x|)
                I_nu(x).
gsl_sf_bessel_J_array ...
                Array of Regular Bessel Functions J_{s}(x) to
                J_{s+n-1}(x).
gsl_sf_bessel_Jn ...
                Regular Bessel Function J_n(x).
gsl_sf_bessel_Jnu ...
                Regular Cylindrical Bessel Function J_nu(x).
gsl_sf_bessel_K_array ...
                Array of IrRegular Modified Bessel Functions K_{s}(x)
                to K_{s+n-1}(x).
gsl_sf_bessel_K_scaled_array ...
                Array of Scaled IrRegular Modified Bessel Functions
                exp(-|x|) K_{s}(x) to exp(-|x|) K_{s+n-1}(x).
gsl_sf_bessel_Kn ...
                IrRegular Modified Bessel Function K_n(x).
gsl_sf_bessel_Kn_scaled ...
                Scaled IrRegular Modified Bessel Function exp(-|x|)
                K_n(x).
gsl_sf_bessel_Knu ...
                Modified Cylindrical Bessel Function K_nu(x).
gsl_sf_bessel_Knu_scaled ...
                Scaled Modified Cylindrical Bessel Function exp(-|x|)
                K_nu(x).
gsl_sf_bessel_Y_array ...
                Array of Regular Bessel Functions Y_{s}(x) to
                Y_{s+n-1}(x).
gsl_sf_bessel_Yn ...
                IrRegular Bessel Function Y_n(x).
gsl_sf_bessel_Ynu ...
                IrRegular Cylindrical Bessel Function J_nu(x).
gsl_sf_bessel_i_scaled_array ...
                Array of Scaled Regular Modified Spherical Bessel
                Functions exp(-|x|) i_{0}(x) to exp(-|x|) i_{n-1}(x).
gsl_sf_bessel_il_scaled ...
                Scaled Regular Modified Spherical Bessel Function
                exp(-|x|) i_n(x).
gsl_sf_bessel_j_array ...
                Array of Spherical Regular Bessel Functions J_{0}(x) to
                J_{n-1}(x).
gsl_sf_bessel_jl ...
                Regular Sphericl Bessel Function J_n(x).
gsl_sf_bessel_k_scaled_array ...
                Array of Scaled IrRegular Modified Spherical Bessel
                Functions exp(-|x|) k_{s}(x) to exp(-|x|) k_{s+n-1}(x).
gsl_sf_bessel_kl_scaled ...
                Scaled IrRegular Modified Spherical Bessel Function
                exp(-|x|) k_n(x).
gsl_sf_bessel_lnKnu ...
                Logarithm of Modified Cylindrical Bessel Function
                K_nu(x).
gsl_sf_bessel_y_array ...
                Array of Regular Spherical Bessel Functions y_{0}(x) to
                y_{n-1}(x).
gsl_sf_bessel_yl ...
                IrRegular Spherical Bessel Function y_n(x).
gsl_sf_beta     Beta Function B(a,b)
gsl_sf_choose   n choose m
gsl_sf_clausen  Clausen Integral. Cl_2(x) := Integrate[-Log[2
                Sin[t/2]], {t,0,x}]
gsl_sf_complex_cos ...
                Cos(z) for complex z
gsl_sf_complex_dilog ...
                DiLogarithm(z), for complex argument z = r Exp[i
                theta].
gsl_sf_complex_log ...
                Complex Logarithm exp(lnr + I theta) = zr + I zi
                Returns argument in [-pi,pi].
gsl_sf_complex_logsin ...
                Log(Sin(z)) for complex z
gsl_sf_complex_sin ...
                Sin(z) for complex z
gsl_sf_conicalP_0 ...
                Conical Function P^{0}_{-1/2 + I lambda}(x)
gsl_sf_conicalP_1 ...
                Conical Function P^{1}_{-1/2 + I lambda}(x)
gsl_sf_conicalP_cyl_reg_e ...
                Regular Cylindrical Conical Function P^{-m}_{-1/2 + I
                lambda}(x)
gsl_sf_conicalP_half ...
                Irregular Spherical Conical Function P^{1/2}_{-1/2 + I
                lambda}(x)
gsl_sf_conicalP_mhalf ...
                Regular Spherical Conical Function P^{-1/2}_{-1/2 + I
                lambda}(x)
gsl_sf_conicalP_sph_reg ...
                Regular Spherical Conical Function P^{-1/2-l}_{-1/2 + I
                lambda}(x)
gsl_sf_cos      Cos(x) with GSL semantics.
gsl_sf_cos_err  Cos(x) for quantity with an associated error.
gsl_sf_coulomb_CL_e ...
                Coulomb wave function normalization constant.
                [Abramowitz+Stegun 14.1.8, 14.1.9].
gsl_sf_coulomb_wave_FGp_array ...
                 Coulomb wave functions F_{lam_F}(eta,x),
                G_{lam_G}(eta,x) and their derivatives; lam_G := lam_F
                - k_lam_G. if ovfw is signaled then F_L(eta,x) =
                fc[k_L] * exp(fe) and similar.
gsl_sf_coulomb_wave_sphF_array ...
                 Coulomb wave function divided by the argument, F(xi,
                eta)/xi. This is the function which reduces to
                spherical Bessel functions in the limit eta->0.
gsl_sf_coupling_3j ...
                3j Symbols: (ja jb jc) over (ma mb mc).
gsl_sf_coupling_6j ...
                6j Symbols: (ja jb jc) over (jd je jf).
gsl_sf_coupling_9j ...
                9j Symbols: (ja jb jc) over (jd je jf) over (jg jh ji).
gsl_sf_dawson   Dawsons integral: Exp[-x^2] Integral[ Exp[t^2],
                {t,0,x}]
gsl_sf_debye_1  D_n(x) := n/x^n Integrate[t^n/(e^t - 1), {t,0,x}]
gsl_sf_debye_2  D_n(x) := n/x^n Integrate[t^n/(e^t - 1), {t,0,x}]
gsl_sf_debye_3  D_n(x) := n/x^n Integrate[t^n/(e^t - 1), {t,0,x}]
gsl_sf_debye_4  D_n(x) := n/x^n Integrate[t^n/(e^t - 1), {t,0,x}]
gsl_sf_dilog    /* Real part of DiLogarithm(x), for real argument. In
                Lewins notation, this is Li_2(x). Li_2(x) = - Re[
                Integrate[ Log[1-s] / s, {s, 0, x}] ]
gsl_sf_doublefact ...
                n!! = n(n-2)(n-4)
gsl_sf_ellint_D Legendre form of incomplete elliptic integrals
                D(phi,k,n)
gsl_sf_ellint_E Legendre form of incomplete elliptic integrals E(phi,k)
                = Integral[ Sqrt[1 - k^2 Sin[t]^2], {t, 0, phi}]
gsl_sf_ellint_Ecomp ...
                Legendre form of complete elliptic integrals E(k) =
                Integral[ Sqrt[1 - k^2 Sin[t]^2], {t, 0, Pi/2}]
gsl_sf_ellint_F Legendre form of incomplete elliptic integrals F(phi,k)
                = Integral[1/Sqrt[1 - k^2 Sin[t]^2], {t, 0, phi}]
gsl_sf_ellint_Kcomp ...
                Legendre form of complete elliptic integrals K(k) =
                Integral[1/Sqrt[1 - k^2 Sin[t]^2], {t, 0, Pi/2}].
gsl_sf_ellint_P Legendre form of incomplete elliptic integrals
                P(phi,k,n) = Integral[(1 + n Sin[t]^2)^(-1)/Sqrt[1 -
                k^2 Sin[t]^2], {t, 0, phi}]
gsl_sf_ellint_RC ...
                Carlsons symmetric basis of functions RC(x,y) = 1/2
                Integral[(t+x)^(-1/2) (t+y)^(-1)], {t,0,Inf}
gsl_sf_ellint_RD ...
                Carlsons symmetric basis of functions RD(x,y,z) = 3/2
                Integral[(t+x)^(-1/2) (t+y)^(-1/2) (t+z)^(-3/2),
                {t,0,Inf}]
gsl_sf_ellint_RF ...
                Carlsons symmetric basis of functions RF(x,y,z) = 1/2
                Integral[(t+x)^(-1/2) (t+y)^(-1/2) (t+z)^(-1/2),
                {t,0,Inf}]
gsl_sf_ellint_RJ ...
                Carlsons symmetric basis of functions RJ(x,y,z,p) = 3/2
                Integral[(t+x)^(-1/2) (t+y)^(-1/2) (t+z)^(-1/2)
                (t+p)^(-1), {t,0,Inf}]
gsl_sf_elljac   Jacobian elliptic functions sn, dn, cn by descending
                Landen transformations
gsl_sf_erf      Error Function erf(x) := 2/Sqrt[Pi]
                Integrate[Exp[-t^2], {t,0,x}]
gsl_sf_erf_Q    Q(x) : Abramowitz+Stegun 26.2.1
gsl_sf_erf_Z    Z(x) : Abramowitz+Stegun 26.2.1
gsl_sf_erfc     Complementary Error Function erfc(x) := 2/Sqrt[Pi]
                Integrate[Exp[-t^2], {t,x,Infinity}]
gsl_sf_eta      Eta Function eta(s) = (1-2^(1-s)) zeta(s)
gsl_sf_exp      Exponential
gsl_sf_exp_err  Exponential of a quantity with given error.
gsl_sf_expint_3 Ei_3(x) := Integral[ Exp[-t^3], {t,0,x}]
gsl_sf_expint_E1 ...
                E_1(x) := Re[ Integrate[ Exp[-xt]/t, {t,1,Infinity}] ]
gsl_sf_expint_E2 ...
                E_2(x) := Re[ Integrate[ Exp[-xt]/t^2, {t,1,Infity}] ]
gsl_sf_expint_Ei ...
                Ei(x) := PV Integrate[ Exp[-t]/t, {t,-x,Infinity}]
gsl_sf_exprel_n N-relative Exponential. exprel_N(x) = N!/x^N (exp(x) -
                Sum[x^k/k!, {k,0,N-1}]) = 1 + x/(N+1) +
                x^2/((N+1)(N+2)) + ... = 1F1(1,1+N,x)
gsl_sf_fact     n!
gsl_sf_fermi_dirac_3half ...
                Complete integral F_{3/2}(x)
gsl_sf_fermi_dirac_half ...
                Complete integral F_{1/2}(x)
gsl_sf_fermi_dirac_inc_0 ...
                Incomplete integral F_0(x,b) = ln(1 + e^(b-x)) - (b-x)
gsl_sf_fermi_dirac_int ...
                Complete integral F_j(x) for integer j
gsl_sf_fermi_dirac_mhalf ...
                Complete integral F_{-1/2}(x)
gsl_sf_gamma    Gamma(x), x not a negative integer
gsl_sf_gamma_inc_P ...
                Complementary Normalized Incomplete Gamma Function
                P(a,x) = 1/Gamma(a) Integral[ t^(a-1) e^(-t), {t,0,x} ]
gsl_sf_gamma_inc_Q ...
                Normalized Incomplete Gamma Function Q(a,x) =
                1/Gamma(a) Integral[ t^(a-1) e^(-t), {t,x,Infinity} ]
gsl_sf_gammainv 1/Gamma(x)
gsl_sf_gammastar ...
                Regulated Gamma Function, x > 0 Gamma^*(x) =
                Gamma(x)/(Sqrt[2Pi] x^(x-1/2) exp(-x)) = (1 + 1/(12x) +
                ...), x->Inf
gsl_sf_gegenpoly_array ...
                Calculate array of Gegenbauer polynomials from 0 to
                n-1.
gsl_sf_gegenpoly_n ...
                Evaluate Gegenbauer polynomials.
gsl_sf_hydrogenicR ...
                Normalized Hydrogenic bound states. Radial dipendence.
gsl_sf_hyperg_0F1 ...
                /* Hypergeometric function related to Bessel functions
                0F1[c,x] = Gamma[c] x^(1/2(1-c)) I_{c-1}(2 Sqrt[x])
                Gamma[c] (-x)^(1/2(1-c)) J_{c-1}(2 Sqrt[-x])
gsl_sf_hyperg_1F1 ...
                Confluent hypergeometric function for integer
                parameters. 1F1[a,b,x] = M(a,b,x)
gsl_sf_hyperg_2F0 ...
                Mysterious hypergeometric function. The series
                representation is a divergent hypergeometric series.
                However, for x < 0 we have 2F0(a,b,x) = (-1/x)^a
                U(a,1+a-b,-1/x)
gsl_sf_hyperg_2F1 ...
                Confluent hypergeometric function for integer
                parameters. 2F1[a,b,c,x]
gsl_sf_hyperg_2F1_conj ...
                Gauss hypergeometric function 2F1[aR + I aI, aR - I aI,
                c, x]
gsl_sf_hyperg_2F1_conj_renorm ...
                Renormalized Gauss hypergeometric function 2F1[aR + I
                aI, aR - I aI, c, x] / Gamma[c]
gsl_sf_hyperg_2F1_renorm ...
                Renormalized Gauss hypergeometric function 2F1[a,b,c,x]
                / Gamma[c]
gsl_sf_hyperg_U Confluent hypergeometric function for integer
                parameters. U(a,b,x)
gsl_sf_hypot    Hypot(x,xx) with GSL semantics.
gsl_sf_hzeta    Hurwicz Zeta Function zeta(s,q) = Sum[ (k+q)^(-s),
                {k,0,Infinity} ]
gsl_sf_laguerre_n ...
                Evaluate generalized Laguerre polynomials.
gsl_sf_legendre_H3d ...
                lth radial eigenfunction of the Laplacian on the
                3-dimensional hyperbolic space.
gsl_sf_legendre_H3d_array ...
                Array of H3d(ell), for l from 0 to n-1.
gsl_sf_legendre_Pl ...
                P_l(x)
gsl_sf_legendre_Pl_array ...
                P_l(x) from 0 to n-1.
gsl_sf_legendre_Plm ...
                P_lm(x)
gsl_sf_legendre_Plm_array ...
                P_lm(x) for l from 0 to n-2+m.
gsl_sf_legendre_Ql ...
                Q_l(x)
gsl_sf_legendre_sphPlm ...
                P_lm(x), normalized properly for use in spherical
                harmonics
gsl_sf_legendre_sphPlm_array ...
                P_lm(x), normalized properly for use in spherical
                harmonics for l from 0 to n-2+m.
gsl_sf_lnbeta   Logarithm of Beta Function Log[B(a,b)]
gsl_sf_lnchoose log(n choose m)
gsl_sf_lncosh   Log(Cos(x)) with GSL semantics.
gsl_sf_lndoublefact ...
                ln n!!
gsl_sf_lnfact   ln n!
gsl_sf_lngamma  Log[Gamma(x)], x not a negative integer Uses real
                Lanczos method. Determines the sign of Gamma[x] as well
                as Log[|Gamma[x]|] for x < 0. So Gamma[x] = sgn *
                Exp[result_lg].
gsl_sf_lngamma_complex ...
                Log[Gamma(z)] for z complex, z not a negative integer.
                Calculates: lnr = log|Gamma(z)|, arg = arg(Gamma(z)) in
                (-Pi, Pi]
gsl_sf_lnpoch   Logarithm of Pochammer (Apell) symbol, with sign
                information. result = log( |(a)_x| ), sgn = sgn( (a)_x
                ) where (a)_x := Gamma[a + x]/Gamma[a]
gsl_sf_lnsinh   Log(Sinh(x)) with GSL semantics.
gsl_sf_log      Provide a logarithm function with GSL semantics.
gsl_sf_log_erfc Log Complementary Error Function
gsl_sf_multiply Multiplication.
gsl_sf_multiply_err ...
                Multiplication with associated errors.
gsl_sf_poch     Pochammer (Apell) symbol (a)_x := Gamma[a + x]/Gamma[x]
gsl_sf_pochrel  Relative Pochammer (Apell) symbol ((a,x) - 1)/x where
                (a,x) = (a)_x := Gamma[a + x]/Gamma[a]
gsl_sf_polar_to_rect ...
                Convert polar to rectlinear coordinates.
gsl_sf_pow_int  Calculate x^n.
gsl_sf_psi      Di-Gamma Function psi(x).
gsl_sf_psi_1piy Di-Gamma Function Re[psi(1 + I y)]
gsl_sf_psi_n    Poly-Gamma Function psi^(n)(x)
gsl_sf_rect_to_polar ...
                Convert rectlinear to polar coordinates. return
                argument in range [-pi, pi].
gsl_sf_sin      Sin(x) with GSL semantics.
gsl_sf_sin_err  Sin(x) for quantity with an associated error.
gsl_sf_synchrotron_1 ...
                First synchrotron function: synchrotron_1(x) = x
                Integral[ K_{5/3}(t), {t, x, Infinity}]
gsl_sf_synchrotron_2 ...
                Second synchroton function: synchrotron_2(x) = x *
                K_{2/3}(x)
gsl_sf_taylorcoeff ...
                x^n / n!
gsl_sf_transport_2 ...
                J(2,x)
gsl_sf_transport_3 ...
                J(3,x)
gsl_sf_transport_4 ...
                J(4,x)
gsl_sf_transport_5 ...
                J(5,x)
gsl_sf_zeta     Riemann Zeta Function zeta(x) = Sum[ k^(-s),
                {k,1,Infinity} ], s != 1.0
gsldiff         This functions serves as an interface to the three
                differentiation functions present in GSL:
                gsl_diff_central, gsl_diff_backward and
                gsl_diff_forward. To compute the derivative, the
                central method uses values greater and smaller than the
                point at which the derivative is to be evaluated, while
                backward and forward use only values smaller and
                greater respectively. gsldiff() returns both the
                derivative and an absolute error estimate. The default
                method is 'central', others can be specified by passing
                an option.
gslinteg_qag    Please check the GSL documentation for more
                information.
gslinteg_qagi   Please check the GSL documentation for more
                information.
gslinteg_qagil  Please check the GSL documentation for more
                information.
gslinteg_qagiu  Please check the GSL documentation for more
                information.
gslinteg_qagp   Please check the GSL documentation for more
                information.
gslinteg_qags   Please check the GSL documentation for more
                information.
gslinteg_qawc   Please check the GSL documentation for more
                information.
gslinteg_qawf   Please check the GSL documentation for more
                information.
gslinteg_qawo   Please check the GSL documentation for more
                information.
gslinteg_qaws   Please check the GSL documentation for more
                information.
gslinteg_qng    [No reference available]
gslmroot_fsolver ...
                [No reference available]
gt              the binary > (greater than) operation
hclip           clip (threshold) `$a' by `$b' (`$b' is upper bound)
hcpy            Switch on/off automatic header copying, with PDL
                pass-through
hdr             Retrieve or set header information from a piddle
hdrcpy          switch on/off/examine automatic header copying
held            Check if a window is on hold
help            print documentation about a PDL function or module or
                show a PDL manual
hi2d            Plot image as 2d histogram (not very good IMHO...)
hist            Create histogram of a piddle
histogram       Create a histogram of a 1-D variable.
histogram2d     Calculates a 2d histogram.
hold            Hold the present window.
hold3d          Keep / don't keep the previous objects when plotting
                new 3D objects
howbig          Returns the size of a piddle datatype in bytes.
i2C             convert imaginary to complex, assuming a real part of
                zero
id              [No reference available]
identity        Return an identity matrix of the specified size. If you
                hand in a scalar, its value is the size of the identity
                matrix; if you hand in a dimensioned PDL, the 0th
                dimension is the size of the matrix.
identvaff       A vaffine identity transformation (includes thread_id
                copying).
ifft            Complex inverse FFT of the "real" and "imag" arrays
                [inplace].
ifftnd          N-dimensional inverse FFT
iis             Displays an image on a IIS device (e.g.
                SAOimage/Ximtool)
iiscirc         Draws a circle on a IIS device (e.g. SAOimage/Ximtool)
iiscur          Return cursor position from an IIS device (e.g.
                SAOimage/Ximtool)
im              [No reference available]
imag            Display an image (uses `pgimag()'/`pggray()' as
                appropriate)
imag1           Display an image with correct aspect ratio
imag2d           Display a 2-D image in a figure window
imag3d          3D rendered image plot, defined by a variety of
                contexts
imagrgb         2D RGB image plot (see also imag2d)
imagrgb3d       2D RGB image plot as an object inside a 3D space
in              test if a is in the set of values b
indadd          Threaded Index Add: Add `a' to the `ind' element of
                `sum', i.e:
index           `index' and `index2d' provide rudimentary index
                indirection.
index2d         `index' and `index2d' provide rudimentary index
                indirection.
indexND          Find selected elements in an N-D piddle, with optional
                boundary handling
indexNDb         Backwards-compatibility alias for indexND
info            Get general information about the PGPLOT environment.
init            The init method initializes a new instance of INTERP.
                It needs as input an interpolation type and two piddles
                holding the x and y values to be interpolated. The GSL
                routines require that x be monotonically increasing and
                a quicksort is performed by default to ensure that. You
                can skip the quicksort by passing the option {Sort =>
                0}.
init_pltr       FIXME: documentation here!
inner           Inner product over one dimension
inner2          Inner product of two vectors and a matrix
inner2d         Inner product over 2 dimensions.
inner2t         Efficient Triple matrix product `a*b*c'
innerwt         Weighted (i.e. triple) inner product
inplace         Flag a piddle so that the next operation is done 'in
                place'
integ           The integ function returns the integral of the
                interpolating function between two points. By default
                it will barf if you try to extrapolate, to comply
                silently if one of the integration limits is out of
                range pass the option {Extrapolate => 1}
interlrgb       Make an RGB image from a palette image and its lookup
                table.
interpND        Interpolate values from an N-D piddle, with switchable
                method
interpol        routine for 1D linear interpolation
interpolate     routine for 1D linear interpolation
intersect       Calculate the intersection of two piddles
intover         Project via integral to N-1 dimensions
inv             Invert a square matrix.
invert          Apply an inverse transformation to some input
                coordinates.
is_inplace      Test the in-place flag on a piddle
isbad           Is a value bad?
isbigendian      Determine endianness of machine - returns 0 or 1
                accordingly
isempty         Test whether a piddle is empty
isfinite        Sets `$mask' true if `$a' is not a `NaN' or `inf'
                (either positive or negative). Works inplace.
isgood          Is a value good?
kcur            Return cursor position from a Karma application (e.g.
                kview/xray)
keeptwiddling3d Wait / don't wait for 'q' after displaying a 3D image.
kernctr         `centre' a kernel (auxiliary routine to fftconvolve)
kim             Sends piddle data array to an external Karma
                application for viewing
koords          Starts external Karma application koords
koverlay        Overlay graphics markers on a Karma application (e.g.
                kview)
kpvslice        Starts external Karma application kpvslice
krenzo          Starts external Karma application krenzo
krgb            Sends RGB image to an external Karma application for
                viewing
kroneckerproduct ...
                returns kroneckerproduct of two matrices. This is not
                efficiently implemented.
kshell          Starts external Karma application kshell
kslice_3d       Starts external Karma application kslice_3d
kstarted        Tests if a Karma application is running.
kview           Starts external Karma application kview
kvis            Starts external Karma application kvis
label_axes      Label plot axes
lags            Returns a piddle of lags to parent.
lattice3d       alias for mesh3d
lclip           clip (threshold) `$a' by `$b' (`$b' is lower bound)
le              the binary <= (less equal) operation
legend          Add a legend to a plot
lgamma          log gamma function
limits          limits derives global limits for one or more
                multi-dimensional sets of data for display purposes. It
                obtains minimum and maximum limits for each dimension
                based upon one of several algorithms.
line            Plot vector as connected points
line3d          3D line plot, defined by a variety of contexts.
lines           Plot a list of vectors as discrete sets of connected
                points
linfit1d        1D Fit linear combination of supplied functions to data
                using min chi^2 (least squares).
list            Convert piddle to perl list
listindices     Convert piddle indices to perl list
lmfit           Levenberg-Marquardt fitting of a user supplied model
                function
load_lut        [No reference available]
log             the natural logarithm
log10           the base 10 logarithm
long            Convert to long datatype - see 'Datatype_conversions'
longlong        Convert to longlong datatype - see
                'Datatype_conversions'
lt              the binary < (less than) operation
lu_backsub      solve a x = b for matrix a, by back substitution into
                a's lu decomposition.
lu_decomp       LU decompose a matrix, with row permutation
lu_decomp2      LU decompose a matrix, with no row permutation
                (threadable!)
lut_data        Load in the requested colour table and intensity ramp.
lut_names       Return, as a list, the names of the available colour
                tables.
lut_ramps       Return, as a list, the names of the available intensity
                ramps.
map             Resample an image or N-D dataset using a coordinate
                transform.
mapflex         Memory map a binary file with flexible format
                specification
mapfraw         Memory map a raw format binary file (see the module
                docs also)
maptextfraw     Memory map a text file (see the module docs also).
matmult         Matrix multiplication
max             Return the maximum value generable by the RNG.
max2d_ind       Return value/position of maximum value in 2D image
maximum         Project via maximum to N-1 dimensions
maximum_ind     Like maximum but returns the index rather than the
                value
maximum_n_ind   Returns the index of `m' maximum elements
med2d           2D median-convolution of an array with a kernel
                (smoothing)
med2df          2D median-convolution of an array in a pxq window
                (smoothing)
median          Return the median of all elements in a piddle
medover         Project via median to N-1 dimensions
mesh3d          3D mesh plot, defined by a variety of contexts
min             Return the minimum value generable by this RNG.
minimum         Project via minimum to N-1 dimensions
minimum_ind     Like minimum but returns the index rather than the
                value
minimum_n_ind   Returns the index of `m' minimum elements
minmax          Returns an array with minimum and maximum values of a
                piddle.
minmaximum      Find minimum and maximum and their indices for a given
                piddle;
minus           subtract two piddles
modulo          elementwise `modulo' operation
mones           constructs a PDL::Matrix object similar to the piddle
                constructors zeroes, ones, sequence.
mouse_moved     [No reference available]
mpdl            constructs an object of class PDL::Matrix which is a
                piddle child class.
msequence       constructs a PDL::Matrix object similar to the piddle
                constructors zeroes, ones, sequence.
mslice          Convenience interface to slice, allowing easier
                inclusion of dimensions in perl code.
mult            multiply two piddles
mv              move a dimension to another position
my              [No reference available]
mzeroes         constructs a PDL::Matrix object similar to the piddle
                constructors zeroes, ones, sequence.
name            Returns the name of the RNG.
nbadover        Find the number of bad elements along the 1st
                dimension.
ndcoords        Enumerate pixel coordinates for an N-D piddle
ndims           Returns the number of dimensions in a piddle. Alias for
                getndims.
ndtri           The value for which the area under the Gaussian
                probability density function (integrated from minus
                infinity) is equal to the argument (cf erfi). Works
                inplace.
ne              binary *not equal to* operation (`!=')
nelem           Return the number of elements in a piddle
new             [No reference available]
new_or_inplace  Return back either the argument pdl or a copy of it
                depending on whether it be flagged in-place or no.
                Handy for building inplace-aware functions.
new_window      Open a PGPLOT graphics device
ngoodover       Find the number of good elements along the 1st
                dimension.
ninterpol       N-dimensional interpolation routine
nokeeptwiddling3d ...
                Wait / don't wait for 'q' after displaying a 3D image.
norm            Normalises a vector to unit Euclidean length
not             the elementwise *not* operation
nslice          Internally used interface to slice and dice that is the
                runtime part of the PDL::NiceSlice implementation.
null            Returns a 'null' piddle.
nullcreate      Returns a 'null' piddle.
oddmedian       Return the oddmedian of all elements in a piddle
oddmedover      Project via oddmedian to N-1 dimensions
oddpct          Return the specified percentile of all elements in a
                piddle. The specified percentile must be between 0.0
                and 1.0. When the specified percentile falls between
                two values, the nearest data value is the result.
oddpctover      [No reference available]
one2nd          Converts a one dimensional index piddle to a set of ND
                coordinates
ones            construct a one filled piddle
oneslice        experimental function - not for public use
options         [No reference available]
or              Return the logical or of all elements in a piddle
or2             binary *or* of two piddles
orig_badvalue   returns the original value used to represent bad values
                for a given type.
orover          Project via or to N-1 dimensions
outer           outer product over one dimension
panel           Switch to a different panel
patch2d         patch bad pixels out of 2D images using a mask
patchbad2d      patch bad pixels out of 2D images containing bad values
pct             Return the specified percentile of all elements in a
                piddle. The specified percentile (p) must be between
                0.0 and 1.0. When the specified percentile falls
                between data points, the result is interpolated.
pctover         [No reference available]
pdl             PDL constructor - creates new piddle from perl
                scalars/arrays, piddles, and strings
pdldoc          Script: shell interface to PDL documentation
perldl          Script: Simple shell for PDL (also see pdl2)
pgwin           Exported constructor for PGPLOT object/device/plot
                window.
plAlloc2dGrid   FIXME: documentation here!
plAllocGrid     FIXME: documentation here!
plGetCursor     plGetCursor waits for graphics input event and
                translate to world coordinates and returns a hash with
                the following keys:
plP_gpixmm      info not available
plParseOpts     FIXME: documentation here!
pl_setcontlabelformat ...
                info not available
pl_setcontlabelparam ...
                info not available
pladv           info not available
plarrows        info not available
plaxes          info not available
plbin           info not available
plbox           info not available
plbox3          info not available
plcalc_world    info not available
plcol0          info not available
plcol1          info not available
plcolorpoints   PDL-specific: Implements what amounts to a threaded
                version of plsym.
plcont          FIXME: documentation here!
plcpstrm        info not available
pldid2pc        info not available
pldip2dc        info not available
plenv           info not available
plenv0          info not available
plerrx          info not available
plerry          info not available
plfbox          info not available
plfill          info not available
plfill3         info not available
plfont          info not available
plfontld        info not available
plgchr          info not available
plgcol0         info not available
plgcol0a        info not available
plgcolbg        info not available
plgcolbga       info not available
plgcompression  info not available
plgdidev        info not available
plgdiori        info not available
plgdiplt        info not available
plgfam          info not available
plgfont         info not available
plglevel        info not available
plgpage         info not available
plgriddata      FIXME: documentation here!
plgsdev         Returns the current driver name.
plgspa          info not available
plgstrm         Returns the number of the current output stream.
plgver          See the PLplot manual for reference.
plgvpd          info not available
plgvpw          info not available
plgxax          info not available
plgyax          info not available
plgzax          info not available
plhist          info not available
plhls           info not available
plhlsrgb        info not available
plimage         info not available
plimagefr       info not available
pljoin          info not available
pllightsource   info not available
plline          Draws line segments along
                (x1,y1)->(x2,y2)->(x3,y3)->...
plline3         info not available
pllsty          info not available
plmap           info not available
plmeridians     info not available
plmesh          FIXME: documentation here!
plmeshc         FIXME: documentation here!
plmkstrm        Creates a new stream and makes it the default. Returns
                the number of the created stream.
plmtex          info not available
plmtex3         info not available
plot3d          FIXME: documentation here!
plot3dc         FIXME: documentation here!
plpat           info not available
plpoin          info not available
plpoin3         info not available
plpoly3         info not available
plprec          info not available
plpsty          info not available
plptex          info not available
plptex3         info not available
plrandd         info not available
plrgb           info not available
plrgb1          info not available
plschr          info not available
plscmap0        info not available
plscmap0a       info not available
plscmap0n       info not available
plscmap1        info not available
plscmap1a       info not available
plscmap1l       FIXME: documentation here!
plscmap1la      FIXME: documentation here!
plscmap1n       info not available
plscol0         info not available
plscol0a        info not available
plscolbg        info not available
plscolbga       info not available
plscolor        info not available
plscompression  info not available
plsdidev        info not available
plsdimap        info not available
plsdiori        info not available
plsdiplt        info not available
plsdiplz        info not available
plseed          info not available
plsfam          info not available
plsfont         info not available
plshade1        FIXME: documentation here!
plshades        info not available
plsmaj          info not available
plsmem          info not available
plsmin          info not available
plsori          info not available
plspage         info not available
plspause        info not available
plsstrm         info not available
plssub          info not available
plssym          info not available
plstar          info not available
plstart         info not available
plstripa        info not available
plstripc        FIXME: documentation here!
plstripd        info not available
plstyl          info not available
plsurf3d        info not available
plsvect         info not available
plsvpa          info not available
plsxax          info not available
plsxwin         info not available
plsyax          info not available
plsym           info not available
plszax          info not available
plus            add two piddles
plvasp          info not available
plvect          FIXME: documentation here!
plvpas          info not available
plvpor          info not available
plw3d           info not available
plwid           info not available
plwind          info not available
plxormod        See the PLplot manual for reference.
pnminascii      Read in an ascii pnm file.
pnminraw        Read in a raw pnm file.
pnmout          Write a line of pnm data.
points          Plot vector as points
points3d        3D points plot, defined by a variety of contexts
poly            Draw a polygon
polyfill        fill the area inside the given polygon with a given
                colour
polyfillv       return the (dataflown) area of an image within a
                polygon
polyroots       Complex roots of a complex polynomial, given
                coefficients in order of decreasing powers.
pow             Synonym for `**'. Works inplace.
power           raise piddle `$a' to the power `b'
pptemplate      Script: script to generate Makefile.PL and PP file
                skeleton
print_by_default ...
                [No reference available]
prod            Return the product of all elements in a piddle
prodover        Project via product to N-1 dimensions
propndfx        [No reference available]
purge           [No reference available]
px              Print info about a piddle (or all known piddles)
qag_meat        info not available
qagi_meat       info not available
qagil_meat      info not available
qagiu_meat      info not available
qagp_meat       info not available
qags_meat       info not available
qawc_meat       info not available
qawf_meat       info not available
qawo_meat       info not available
qaws_meat       info not available
qng_meat        info not available
qsort           Quicksort a vector into ascending order.
qsorti          Quicksort a vector and return index of elements in
                ascending order.
qsortvec        Sort a list of vectors lexicographically.
qsortveci       Sort a list of vectors lexicographically, returning the
                indices of the sorted vectors rather than the sorted
                list itself.
r2C             convert real to complex, assuming an imaginary part of
                zero
rCpolynomial    evaluate the polynomial with (real) coefficients
                `coeffs' at the (complex) position(s) `x'. `coeffs[0]'
                is the constant term.
ran_additive_gaussian ...
                Add Gaussian noise of given sigma to a piddle.
ran_additive_poisson ...
                Add Poisson noise of given sigma to a piddle.
ran_bivariate_gaussian ...
                Generates $n bivariate gaussian random deviates.
ran_caos        Returns values from Verhuls map with $r=4.0 and
                randomly choosen $x0. The values are scaled by $m.
ran_choose      Chooses values from $inpiddle to $outpiddle.
ran_choose_vec  Chooses $n values from @vec.
ran_dir         Returns `$n' random vectors in `$ndim' dimensions.
ran_discrete    Is used to get the desired samples once a proper handle
                has been enstablished (see ran_discrete_preproc()).
ran_discrete_preproc ...
                This method returns a handle that must be used when
                calling ran_discrete(). You specify the probability of
                the integer number that are returned by ran_discrete().
ran_feed_poisson ...
                This method simulates shot noise, taking the values of
                piddle as values for mu to be fed in the poissonian
                RNG.
ran_gaussian    These functions return random deviates from given
                distribution.
ran_gaussian_var ...
                This method is similar to ran_[distrib]() except that
                it takes the parameters of the distribution as a piddle
                and returns a piddle of equal dimensions. Of course,
                you can use the same set of distributions as in the
                previous method (see also the ran_gaussian entry
                above).
ran_shuffle     Shuffles values in piddle
ran_shuffle_vec Shuffles values in piddle
ran_ver         Returns a piddle with $n values generated by the
                Verhulst map from $x0 and paramater $r.
random          Constructor which returns piddle of random numbers
randsym         Constructor which returns piddle of random numbers
range           Extract selected chunks from a source piddle, with
                boundary conditions
rangeb          Engine for range
rasc             Simple function to slurp in ASCII numbers quite
                quickly, although error handling is marginal (to
                nonexistent).
rcols           Read specified ASCII cols from a file into piddles and
                perl arrays (also see the rgrep() entry elsewhere in
                this document).
rcube            Read list of files directly into a large data cube
                (for efficiency)
rdsa             Read a FIGARO/NDF format file.
re              [No reference available]
read_png        [No reference available]
read_png_true   [No reference available]
readflex        Read a binary file with flexible format specification
readfraw        Read a raw format binary file
real            [No reference available]
realfft         One-dimensional FFT of real function [inplace].
realifft        Inverse of one-dimensional realfft routine [inplace].
rebin           N-dimensional rebinning algorithm
rect            Draw a non-rotated rectangle
rectangle       Draw a rectangle.
reduce          reduce dimension of piddle by one by applying an
                operation along the specified dimension
refresh         refresh() causes a display event to be put at the top
                of the TriD work que. This should be called at the end
                of each user defined TriD::Tk callback.
release         Release a plot window.
release3d       Keep / don't keep the previous objects when plotting
                new 3D objects
release_signals To prevent pgplot from doing a fandango on core, we
                have to block interrupts during PGPLOT calls.
                Specifically, INT needs to get caught. These internal
                routines provide a mechanism for that.
reorder         Re-orders the dimensions of a PDL based on the supplied
                list.
repulse         Repulsive potential for molecule-like constructs.
rescale2d       The first piddle is rescaled to the dimensions of the
                second (expanding or meaning values as needed) and then
                added to it in place. Nothing useful is returned.
reshape         Change the shape (i.e. dimensions) of a piddle,
                preserving contents.
rfits           Simple piddle FITS reader.
rfitshdr        Read only the header of a FITS file or an extension
                within it.
rgbi            Display an RGB color image
rgbtogr         Converts an RGB image to a grey scale using standard
                transform
rgrep            Read columns into piddles using full regexp pattern
                matching.
rice_compress   Squishes an input PDL along the 0 dimension by Rice
                compression. In scalar context, you get back only the
                compressed PDL; in list context, you also get back
                ancillary information that is required to uncompress
                the data with rice_uncompress.
rice_expand     Unsquishes a PDL that has been squished by rice_expand.
rim             Read images in most formats, with improved RGB
                handling.
rint            Round to integer values in floating-point format.
rld             Run-length decode a vector
rle             Run-length encode a vector
rndf            Reads a piddle from a NDF format data file.
rot2d           rotate an image by given `angle'
rotate          Shift vector elements along with wrap. Flows data
                back&forth.
rpic            Read images in many formats with automatic format
                detection.
rpiccan         Test which image formats can be read/written
rpnm            Read a pnm (portable bitmap/pixmap, pbm/ppm) file into
                a piddle.
rvals           Fills a piddle with radial distance values from some
                centre.
s_identity      Internal vaffine identity function.
saoimage        Starts the SAOimage external program
sclr            return a single value from a piddle as a scalar
sdump           Dump a data structure to a string.
sequence        Create array filled with a sequence of values
set             Set a single value inside a piddle
set_colortable  Sets contour level colors based on the color table.
set_inplace     Set the in-place flag on a piddle
set_seed        Sets the RNG seed.
set_wh           Define the width and Height of the window for button
                control
setbadat        Set the value to bad at a given position.
setbadif        Set elements bad based on the supplied mask, otherwise
                copy across the data.
setbadtonan     Sets Bad values to NaN (only relevant for
                floating-point piddles). Can be done inplace and it
                clears the bad flag.
setbadtoval     Replace any bad values by a (non-bad) value.
sethdr          Set header information of a piddle
setnantobad     Sets NaN/Inf values in the input piddle bad (only
                relevant for floating-point piddles). Can be done
                inplace.
setops          Implements simple set operations like union and
                intersection
setparm         Set options for a plot object.
setstr          Function to set one string value in a character PDL.
                The input position is the position of the string, not a
                character in the string. The first dimension is assumed
                to be the length of the string.
setvaltobad     Set bad all those elements which equal the supplied
                value.
sever           sever any links of this piddle to parent piddles
shadeplot       Create a shaded contour plot of 2D PDL 'z' with
                'nsteps' contour levels. Linear scaling is used to map
                the coordinates of Z(X, Y) to world coordinates via the
                the BOX entry elsewhere in this document option.
shiftleft       leftshift `a$' by `$b'
shiftright      leftshift `a$' by `$b'
short           Convert to short datatype - see 'Datatype_conversions'
sig             prints signature of PDL function
signal_catcher  To prevent pgplot from doing a fandango on core, we
                have to block interrupts during PGPLOT calls.
                Specifically, INT needs to get caught. These internal
                routines provide a mechanism for that.
simplex         Simplex optimization routine
simq            Solution of simultaneous linear equations, `a x = b'.
sin             the sin function
sinh            The standard hyperbolic function. Works inplace.
slice           Extract a rectangular slice of a piddle, from a string
                specifier.
spaceship       elementwise "<=>" operation
spheres3d       3D spheres plot (preliminary implementation)
splitdim        Splits a dimension in the parent piddle (opposite of
                clump)
sqrt            elementwise square root
squaretotri     Convert a symmetric square matrix to triangular vector
                storage.
squeeze         eliminate all singleton dimensions (dims of size 1)
stats           Calculates useful statistics on a piddle
statsover       Calculate useful statistics over a dimension of a
                piddle
store           store a piddle using Storable
stretcher       Return a diagonal matrix with the specified diagonal
                elements
string          Function to print a character PDL (created by 'char')
                in a pretty format.
stripplots      Plot a set of strip plots with a common X axis, but
                with different Y axes. Looks like a stack of long, thin
                XY plots, all line up on the same X axis.
subs            test if routine is a known PDL lvalue sub
sum             Return the sum of all elements in a piddle
sumover         Project via sum to N-1 dimensions
svd             Singular value decomposition of a matrix.
swcols          generate string list from `sprintf' format specifier
                and a list of piddles
sync            [No reference available]
t_aitoff        [No reference available]
t_albers        (Cartography) Albers conic projection (conic; authalic)
t_az_eqa        (Cartography) Azimuthal equal-area projection (az.;
                auth.)
t_az_eqd        (Cartography) Azimuthal equidistant projection (az.;
                equi.)
t_caree         (Cartography) Plate Caree projection (cylindrical;
                equidistant)
t_code          Transform implementing arbitrary perl code.
t_compose       Function composition: f(g(x)), f(g(h(x))), ...
t_conic         (Cartography) Simple conic projection (conic;
                equidistant)
t_cylindrical   [No reference available]
t_fits          FITS pixel-to-scientific transformation with inverse
t_gnomonic      (Cartography) Gnomonic (focal-plane) projection (az.;
                persp.)
t_hammer        (Cartography) Hammer/Aitoff elliptical projection (az.;
                auth.)
t_identity      Generic constructor generates the identity transform.
t_inverse       Return the inverse of a PDL::Transform. This just
                reverses the func/inv, idim/odim, itype/otype, and
                iunit/ounit pairs. Note that sometimes you end up with
                a transform that cannot be applied or mapped, because
                either the mathematical inverse doesn't exist or the
                inverse func isn't implemented.
t_lambert       (Cartography) Lambert conic projection (conic;
                conformal)
t_linear        Linear (affine) transformations with optional offset
t_lookup        Transform by lookup into an explicit table.
t_mercator      (Cartography) Mercator projection (cylindrical;
                conformal)
t_offset        Convenience interface to t_linear.
t_orthographic  (Cartography) Ortho. projection (azimuthal;
                perspective)
t_perspective   (Cartography) Arbitrary perspective projection
t_proj          [No reference available]
t_proj_aea      [No reference available]
t_proj_aeqd     [No reference available]
t_proj_airy     [No reference available]
t_proj_aitoff   [No reference available]
t_proj_alsk     [No reference available]
t_proj_apian    [No reference available]
t_proj_august   [No reference available]
t_proj_bacon    [No reference available]
t_proj_bipc     [No reference available]
t_proj_boggs    [No reference available]
t_proj_bonne    [No reference available]
t_proj_cass     [No reference available]
t_proj_cc       [No reference available]
t_proj_cea      [No reference available]
t_proj_chamb    [No reference available]
t_proj_collg    [No reference available]
t_proj_crast    [No reference available]
t_proj_denoy    [No reference available]
t_proj_eck1     [No reference available]
t_proj_eck2     [No reference available]
t_proj_eck3     [No reference available]
t_proj_eck4     [No reference available]
t_proj_eck5     [No reference available]
t_proj_eck6     [No reference available]
t_proj_eqc      [No reference available]
t_proj_eqdc     [No reference available]
t_proj_euler    [No reference available]
t_proj_fahey    [No reference available]
t_proj_fouc     [No reference available]
t_proj_fouc_s   [No reference available]
t_proj_gall     [No reference available]
t_proj_geocent  [No reference available]
t_proj_geos     [No reference available]
t_proj_gins8    [No reference available]
t_proj_gn_sinu  [No reference available]
t_proj_gnom     [No reference available]
t_proj_goode    [No reference available]
t_proj_gs48     [No reference available]
t_proj_gs50     [No reference available]
t_proj_gstmerc  [No reference available]
t_proj_hammer   [No reference available]
t_proj_hatano   [No reference available]
t_proj_imw_p    [No reference available]
t_proj_kav5     [No reference available]
t_proj_kav7     [No reference available]
t_proj_krovak   [No reference available]
t_proj_labrd    [No reference available]
t_proj_laea     [No reference available]
t_proj_lagrng   [No reference available]
t_proj_larr     [No reference available]
t_proj_lask     [No reference available]
t_proj_latlon   [No reference available]
t_proj_latlong  [No reference available]
t_proj_lcc      [No reference available]
t_proj_lcca     [No reference available]
t_proj_leac     [No reference available]
t_proj_lee_os   [No reference available]
t_proj_longlat  [No reference available]
t_proj_lonlat   [No reference available]
t_proj_loxim    [No reference available]
t_proj_lsat     [No reference available]
t_proj_mbt_fps  [No reference available]
t_proj_mbt_s    [No reference available]
t_proj_mbtfpp   [No reference available]
t_proj_mbtfpq   [No reference available]
t_proj_mbtfps   [No reference available]
t_proj_merc     [No reference available]
t_proj_mil_os   [No reference available]
t_proj_mill     [No reference available]
t_proj_moll     [No reference available]
t_proj_murd1    [No reference available]
t_proj_murd2    [No reference available]
t_proj_murd3    [No reference available]
t_proj_nell     [No reference available]
t_proj_nell_h   [No reference available]
t_proj_nicol    [No reference available]
t_proj_nsper    [No reference available]
t_proj_nzmg     [No reference available]
t_proj_ob_tran  [No reference available]
t_proj_ocea     [No reference available]
t_proj_oea      [No reference available]
t_proj_omerc    [No reference available]
t_proj_ortel    [No reference available]
t_proj_ortho    [No reference available]
t_proj_pconic   [No reference available]
t_proj_poly     [No reference available]
t_proj_putp1    [No reference available]
t_proj_putp2    [No reference available]
t_proj_putp3    [No reference available]
t_proj_putp3p   [No reference available]
t_proj_putp4p   [No reference available]
t_proj_putp5    [No reference available]
t_proj_putp5p   [No reference available]
t_proj_putp6    [No reference available]
t_proj_putp6p   [No reference available]
t_proj_qua_aut  [No reference available]
t_proj_robin    [No reference available]
t_proj_rouss    [No reference available]
t_proj_rpoly    [No reference available]
t_proj_sinu     [No reference available]
t_proj_somerc   [No reference available]
t_proj_stere    [No reference available]
t_proj_sterea   [No reference available]
t_proj_tcc      [No reference available]
t_proj_tcea     [No reference available]
t_proj_tissot   [No reference available]
t_proj_tmerc    [No reference available]
t_proj_tpeqd    [No reference available]
t_proj_tpers    [No reference available]
t_proj_ups      [No reference available]
t_proj_urm5     [No reference available]
t_proj_urmfps   [No reference available]
t_proj_utm      [No reference available]
t_proj_vandg    [No reference available]
t_proj_vandg2   [No reference available]
t_proj_vandg3   [No reference available]
t_proj_vandg4   [No reference available]
t_proj_vitk1    [No reference available]
t_proj_wag1     [No reference available]
t_proj_wag2     [No reference available]
t_proj_wag3     [No reference available]
t_proj_wag4     [No reference available]
t_proj_wag5     [No reference available]
t_proj_wag6     [No reference available]
t_proj_wag7     [No reference available]
t_proj_weren    [No reference available]
t_proj_wink1    [No reference available]
t_proj_wink2    [No reference available]
t_proj_wintri   [No reference available]
t_projective    Projective transformation
t_quadratic     Quadratic scaling -- cylindrical pincushion (n-d; with
                inverse)
t_radial        Convert Cartesian to radial/cylindrical coordinates.
                (2-D/3-D; with inverse)
t_rot           Convenience interface to t_linear.
t_rot_sphere    (Cartography) Generate oblique projections
t_scale         Convenience interface to t_linear.
t_sin_lat       (Cartography) Cyl. equal-area projection (cyl.;
                authalic)
t_sinusoidal    (Cartography) Sinusoidal projection (authalic)
t_spherical     Convert Cartesian to spherical coordinates. (3-D; with
                inverse)
t_stereographic (Cartography) Stereographic projection (az.; conf.;
                persp.)
t_unit_sphere   (Cartography) 3-D globe projection (conformal;
                authalic)
t_utm           (Cartography) Universal Transverse Mercator projection
                (cylindrical)
t_vertical      (Cartography) Vertical perspective projection (az.;
                persp.)
t_wrap          Shift a transform into a different space by 'wrapping'
                it with a second.
tan             The usual trigonometric function. Works inplace.
tanh            The standard hyperbolic function. Works inplace.
tcircle         A threaded interface to circle
text            Write text in a plot window at a specified position.
threadI         internal
thread_define   define functions that support threading at the perl
                level
tline           Threaded line plotting
tlmfit          threaded version of Levenberg-Marquardt fitting routine
                mfit
to_pdl          [No reference available]
topdl           alternate piddle constructor - ensures arg is a piddle
tpoints         A threaded interface to points
trace           returns the trace of a matrix (sum of diagonals)
transform       Create transform array for contour and image plotting
transpose       transpose rows and columns.
trylink         a perl configure clone
twiddle          Enable GUI interaction with a FreeGLUT display window.
twiddle3d       Wait for the user to rotate the image in 3D space.
type            return the type of a piddle as a blessed type object
uniq            return all unique elements of a piddle
uniqind         Return the indices of all unique elements of a piddle
                The order is in the order of the values to be
                consistent with uniq. `NaN' values never compare equal
                with any other value and so are always unique. This
                follows the Matlab usage.
uniqvec         Return all unique vectors out of a collection
unmap           Map an image or N-D dataset using the inverse as a
                coordinate transform.
unthread        All threaded dimensions are made real again.
upd_data        Update the data pointer in a piddle to match its perl
                SV.
usage           Prints usage information for a PDL function
ushort          Convert to ushort datatype - see 'Datatype_conversions'
using           Returns array of column numbers requested
vars            Alias for `px'
vcrossp         similar to PDL::crossp, however reflecting PDL::Matrix
                notations
vect            Display 2 images as a vector field
vones           constructs a PDL::Matrix object with matrix dimensions
                (n x 1), therefore only the first scalar argument is
                used.
vpdl            constructs an object of class PDL::Matrix which is of
                matrix dimensions (n x 1)
vrmlcoordsvert  info not available
vsearch         routine for searching 1D values i.e. step-function
                interpolation.
vsequence       constructs a PDL::Matrix object with matrix dimensions
                (n x 1), therefore only the first scalar argument is
                used.
vzeroes         constructs a PDL::Matrix object with matrix dimensions
                (n x 1), therefore only the first scalar argument is
                used.
warp2d          Warp a 2D image given a polynomial describing the
                *reverse* mapping.
warp2d_kernel   Return the specified kernel, as used by warp2d
wcols            Write ASCII columns into file from 1D piddles or
                listrefs efficiently.
wfits           Simple PDL FITS writer
whatis          Describe a perl and/or PDL variable or expression.
                Useful for determining the type of an expression,
                identifying the keys in a hash or a data structure, or
                examining WTF an unknown object is.
where           Use a mask to select values from one or more data PDLs
which           Returns indices of non-zero values from a 1-D PDL
whichND         Return the coordinates of non-zero values in a mask.
which_both      Returns indices of zero and nonzero values in a mask
                PDL
whist           Create a weighted histogram of a piddle
whistogram      Calculates a histogram from weighted data for given
                stepsize and minimum.
whistogram2d    Calculates a 2d histogram from weighted data.
wim             Write out an image file. You can specify the format
                explicitly as an option, or the function will try to
                guess the correct image format from the filename
                extension, e.g.
window_list     Return a list of ID numbers and names of the windows
                currently opened using dev or new_window.
wmpeg           Write an image sequence ((3,x,y,n) piddle) as an MPEG
                animation.
wndf            Writes a piddle to a NDF format file:
wpic            Write images in many formats with automatic format
                selection.
wpiccan         Test which image formats can be read/written
wpnm            Write a pnm (portable bitmap/pixmap, pbm/ppm) file into
                a file.
write_Gd        [No reference available]
write_Gd2       [No reference available]
write_Gif       [No reference available]
write_Jpeg      [No reference available]
write_Png       [No reference available]
write_PngEx     [No reference available]
write_WBMP      [No reference available]
write_png       [No reference available]
write_png_best  [No reference available]
write_png_ex    Same as write_png(), except you can specify the
                compression level (0-9) as the last arguement.
write_true_png  [No reference available]
write_true_png_best ...
                [No reference available]
write_true_png_ex ...
                Same as write_true_png(), except you can specify the
                compression level (0-9) as the last arguement.
writeflex        Write a binary file with flexible format specification
writeflexhdr     Write the header file corresponding to a previous
                writeflex call
writefraw       Write a raw format binary file
wtstat          Weighted statistical moment of given degree
x               Matrix multiplication
xchg            exchange two dimensions
ximtool         Starts the Ximtool external program
xlinvals        X axis values between endpoints (see xvals).
xlogvals        X axis values logarithmicly spaced between endpoints
                (see xvals).
xor             binary *exclusive or* of two piddles
xray            Starts external Karma application xray
xvals           Fills a piddle with X index values. Uses similar
                specifications to zeroes and new_from_specification.
xyplot          Plot XY lines and/or points. Also supports color scales
                for points. This function works with bad values. If a
                bad value is specified for a points plot, it is
                omitted. If a bad value is specified for a line plot,
                the bad value makes a gap in the line. This is useful
                for drawing maps; for example `$x' and `$y' can be the
                continent boundary latitude and longitude.
y)              [No reference available]
ylinvals        Y axis values between endpoints (see yvals).
ylogvals        Y axis values logarithmicly spaced between endpoints
                (see yvals).
yvals           Fills a piddle with Y index values. See the CAVEAT for
                xvals.
zcheck          Return the check for zero of all elements in a piddle
zcover          Project via == 0 to N-1 dimensions
zeroes          construct a zero filled piddle from dimension list or
                template piddle.
zeros           construct a zero filled piddle (see zeroes for usage)
zlinvals        Z axis values between endpoints (see zvals).
zlogvals        Z axis values logarithmicly spaced between endpoints
                (see zvals).
zvals           Fills a piddle with Z index values. See the CAVEAT for
                xvals.

